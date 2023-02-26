import Radio from "@/components/atoms/Radio"

interface TitleCardProps {
  checked: boolean,
  className?: string
  color?: string,
  empty?: boolean,
  keyValues: { [key: string]: string },
  setSelectedAsset: () => void,
  style?: object,
  title: string
}
const TitleCard = ({
  className,
  title,
  color = "#C2C1C2",
  keyValues,
  empty,
  checked,
  setSelectedAsset,
}: TitleCardProps) => (
  <div
    className={`w-[30%] max-w-sm h-[17rem] overflow-hidden themeRounded ${className}`}
  >
    <div
      className={`h-10 flex items-center pl-[1.05rem]`}
      style={{ background: color }}
    >
      <Radio checked={checked} className={"mr-3"} onClick={setSelectedAsset} />
      <p>{title}</p>
    </div>
    <div
      className={`${empty ? "h-16" : "h-full"} w-full bg-[#EFEFEF] px-4 pt-3`}
    >
      {Object.keys(keyValues).map((key, i) => (
        <div key={i}>
          <p className={`text-[#787878] text-sm ${i !== 0 && "mt-2"}`}>{key}</p>
          <p className="text-sm">{keyValues[key]}</p>
        </div>
      ))}
    </div>
  </div>
)

export default TitleCard
