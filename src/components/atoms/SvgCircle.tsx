export const SvgCircle = ({ radiusPx }: { radiusPx: number }) => (
  <svg
    className="fill-inherit"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle 
      cx={String(radiusPx * 2)}
      cy={String(radiusPx)} 
      r={String(radiusPx)} />
  </svg>
)