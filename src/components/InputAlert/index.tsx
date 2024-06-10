interface Props {
  alertMessage: string;    
}

export default function InputAlert({ alertMessage }: Props) {
  return (
    <div>
      <p className="text-red-500 text-xs italic">{alertMessage}</p>
    </div>
  )
}