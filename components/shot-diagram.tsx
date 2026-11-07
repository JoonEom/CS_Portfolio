/**
 * The hero's signature moment: a dimensioned side view of a three-point shot.
 * Floor, hoop and distances draw themselves in; the dashed trajectory is
 * revealed in step with a ball that follows the exact same parabola into the
 * net, drops through, bounces three times and comes to rest.
 *
 * Geometry is true to scale at 28 units per foot (10 ft rim, 15 ft free-throw
 * line, 23 ft 9 in three-point line), and the ball keyframes are computed from
 * that geometry rather than eyeballed. Everything animates with CSS only, and
 * the markup is already in its finished state, so reduced-motion and no-JS
 * visitors see the completed diagram.
 */

const FT = 28;
const FLOOR_Y = 560;
const RIM_Y = FLOOR_Y - 10 * FT; // 280
const RIM_LEFT = 816;
const RIM_RIGHT = 858;
const RIM_CX = (RIM_LEFT + RIM_RIGHT) / 2; // 837
const BOARD_X = 866;
const FREE_THROW_X = BOARD_X - 15 * FT; // 446
const THREE_X = Math.round(RIM_CX - 23.75 * FT); // 172
const BALL_R = 24;
const REST_Y = FLOOR_Y - BALL_R; // 536

// A quadratic Bézier with its control point at the horizontal midpoint has x
// linear in t, so the trajectory reveal (which scales in x) stays in step with
// the ball, and y(t) is a true parabola.
const P0 = { x: THREE_X, y: 350 };
const P2 = { x: RIM_CX, y: RIM_Y };
const C = { x: (P0.x + P2.x) / 2, y: -40 };

const bezier = (t: number) => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * C.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * C.y + t ** 2 * P2.y,
});

type Frame = { time: number; x: number; y: number };

function buildBallFrames() {
  const frames: Frame[] = [];
  let clock = 0;
  const push = (time: number, x: number, y: number) =>
    frames.push({ time, x, y });

  // Flight: x linear in time, y parabolic
  const flight = 1.15;
  for (let i = 0; i <= 10; i += 1) {
    const t = i / 10;
    const p = bezier(t);
    push(t * flight, p.x, p.y);
  }
  clock = flight;

  // Drop through the net, accelerating under gravity
  const fall = 0.42;
  for (const u of [0.25, 0.5, 0.75, 1]) {
    push(clock + fall * u, RIM_CX - 1 * u, RIM_Y + (REST_Y - RIM_Y) * u * u);
  }
  clock += fall;
  let x = RIM_CX - 1;

  // Three bounces, each lower and shorter, drifting toward where it rests
  const bounces = [
    { height: 120, duration: 0.55, toX: 800 },
    { height: 44, duration: 0.34, toX: 772 },
    { height: 14, duration: 0.2, toX: 756 },
  ];
  for (const b of bounces) {
    for (const s of [0.25, 0.5, 0.75, 1]) {
      const arc = 1 - (2 * s - 1) ** 2;
      push(
        clock + b.duration * s,
        x + (b.toX - x) * s,
        REST_Y - b.height * arc,
      );
    }
    clock += b.duration;
    x = b.toX;
  }

  // A short roll that decelerates to rest
  const roll = 0.3;
  const restX = 735;
  for (const s of [0.5, 1]) {
    push(clock + roll * s, x + (restX - x) * (1 - (1 - s) ** 2), REST_Y);
  }
  clock += roll;

  return { frames, total: clock, restX };
}

const { frames, total, restX } = buildBallFrames();

const ballKeyframes = `@keyframes sd-ball{${frames
  .map(
    (f) =>
      `${((f.time / total) * 100).toFixed(2)}%{transform:translate(${f.x.toFixed(1)}px,${f.y.toFixed(1)}px)}`,
  )
  .join("")}}`;

// One-foot ruler ticks along the floor between the three-point line and board
const rulerPath = Array.from({ length: 25 }, (_, i) => {
  const x = THREE_X + i * FT;
  const long = i % 5 === 0;
  return `M${x} ${FLOOR_Y}v${long ? 18 : 9}`;
}).join(" ");

const trajectory = `M${P0.x} ${P0.y} Q${C.x} ${C.y} ${P2.x} ${P2.y}`;

export function ShotDiagram({ className = "" }: { className?: string }) {
  const draw = (delay: number) =>
    ({ "--sd-delay": `${delay}s` }) as React.CSSProperties;

  return (
    <svg
      viewBox="40 0 960 650"
      role="img"
      aria-label="Dimensioned diagram of a three-point shot arcing into a hoop ten feet above the floor"
      className={`text-ink ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
    >
      <style dangerouslySetInnerHTML={{ __html: ballKeyframes }} />
      <defs>
        <clipPath id="sd-clip">
          <rect
            className="sd-reveal"
            x={P0.x - 30}
            y="0"
            width={RIM_CX - P0.x + 60}
            height="650"
          />
        </clipPath>
      </defs>

      {/* Floor and one-foot ruler */}
      <line
        className="sd-draw"
        pathLength={1}
        x1="40"
        y1={FLOOR_Y}
        x2="965"
        y2={FLOOR_Y}
        strokeWidth="4"
        style={draw(0)}
      />
      <path
        className="sd-draw"
        pathLength={1}
        d={rulerPath}
        strokeWidth="2"
        style={draw(0.2)}
      />

      {/* Distance markers */}
      <g strokeWidth="3">
        <line
          className="sd-draw"
          pathLength={1}
          x1={THREE_X}
          y1={FLOOR_Y - 14}
          x2={THREE_X}
          y2={FLOOR_Y + 36}
          style={draw(0.3)}
        />
        <line
          className="sd-draw"
          pathLength={1}
          x1={FREE_THROW_X}
          y1={FLOOR_Y - 14}
          x2={FREE_THROW_X}
          y2={FLOOR_Y + 36}
          style={draw(0.4)}
        />
      </g>
      <g
        className="sd-fade"
        style={draw(0.9)}
        fill="currentColor"
        stroke="none"
        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
        fontWeight="600"
      >
        <text
          className="sd-label"
          data-part="label"
          x={THREE_X}
          y={FLOOR_Y + 66}
          textAnchor="middle"
        >
          THREE 23′9″
        </text>
        <text
          className="sd-label"
          data-part="label"
          x={FREE_THROW_X}
          y={FLOOR_Y + 66}
          textAnchor="middle"
        >
          FREE THROW 15′
        </text>
      </g>

      {/* Hoop: post, arm, backboard, rim */}
      <g strokeWidth="6">
        <line
          className="sd-draw"
          pathLength={1}
          x1="936"
          y1={FLOOR_Y}
          x2="936"
          y2="318"
          style={draw(0.35)}
        />
        <line
          className="sd-draw"
          pathLength={1}
          x1="936"
          y1="318"
          x2={BOARD_X + 9}
          y2="318"
          style={draw(0.5)}
        />
        <rect
          className="sd-draw"
          pathLength={1}
          x={BOARD_X}
          y="210"
          width="9"
          height="98"
          style={draw(0.55)}
        />
        <line
          className="sd-draw"
          pathLength={1}
          x1={RIM_LEFT}
          y1={RIM_Y}
          x2={BOARD_X}
          y2={RIM_Y}
          style={draw(0.7)}
        />
      </g>

      {/* Net, which snaps when the ball arrives */}
      <g className="sd-net" strokeWidth="2">
        <path
          d={`M${RIM_LEFT} ${RIM_Y} L828 332 M${RIM_RIGHT} ${RIM_Y} L846 332 M829 ${RIM_Y} L837 332 M845 ${RIM_Y} L837 332 M821 296 L853 296 M824 312 L850 312 M827 326 L847 326`}
        />
      </g>

      {/* Ten-foot dimension */}
      <g strokeWidth="2">
        <line
          className="sd-draw"
          pathLength={1}
          x1={RIM_RIGHT + 8}
          y1={RIM_Y}
          x2="985"
          y2={RIM_Y}
          strokeDasharray="2 6"
          style={draw(0.8)}
        />
        <line
          className="sd-draw"
          pathLength={1}
          x1="985"
          y1={RIM_Y}
          x2="985"
          y2={FLOOR_Y}
          style={draw(0.85)}
        />
        <line x1="976" y1={RIM_Y} x2="994" y2={RIM_Y} />
        <line x1="976" y1={FLOOR_Y} x2="994" y2={FLOOR_Y} />
      </g>
      <text
        className="sd-fade sd-label"
        data-part="label"
        style={draw(1.1)}
        x="974"
        y={(RIM_Y + FLOOR_Y) / 2}
        transform={`rotate(-90 974 ${(RIM_Y + FLOOR_Y) / 2})`}
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontFamily="var(--font-geist-mono), ui-monospace, monospace"
        fontWeight="600"
      >
        RIM 10′
      </text>

      {/* Where the shot starts: a ghost ball on the three-point line, tied to
          its floor marker so the label and the release point read as one */}
      <g className="sd-fade" style={draw(0.6)} strokeWidth="2.5" opacity="0.75">
        <circle cx={P0.x} cy={P0.y} r={BALL_R} strokeDasharray="4 6" />
        <line
          x1={P0.x}
          y1={P0.y + BALL_R + 10}
          x2={P0.x}
          y2={FLOOR_Y - 18}
          strokeDasharray="2 9"
          strokeWidth="2"
        />
      </g>

      {/* Trajectory, revealed in step with the ball's horizontal travel */}
      <path
        d={trajectory}
        strokeWidth="3"
        strokeDasharray="3 9"
        clipPath="url(#sd-clip)"
      />

      {/* The ball: ink with court-coloured seams. Its resting position is the
          base style, so no animation means it simply sits there. */}
      <g
        className="sd-ball"
        style={{ transform: `translate(${restX}px, ${REST_Y}px)` }}
      >
        <g className="sd-spin">
          <circle r={BALL_R} fill="currentColor" stroke="none" />
          <g stroke="rgb(var(--court))" strokeWidth="2.4" strokeLinecap="round">
            <path d={`M0 ${-BALL_R} V${BALL_R} M${-BALL_R} 0 H${BALL_R}`} />
            <path d="M-17 -17 Q-8 0 -17 17 M17 -17 Q8 0 17 17" />
          </g>
        </g>
      </g>
    </svg>
  );
}
