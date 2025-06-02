interface Prop {
  name: string
  type: string
  defaultValue?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  props: Prop[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-border-divider border-b">
            <th className="text-text-body p-3 text-left font-medium">プロパティ</th>
            <th className="text-text-body p-3 text-left font-medium">型</th>
            <th className="text-text-body p-3 text-left font-medium">デフォルト</th>
            <th className="text-text-body p-3 text-left font-medium">説明</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-border-divider border-b">
              <td className="p-3">
                <code className="bg-bg-secondary rounded px-2 py-1 text-sm">{prop.name}</code>
                {prop.required && <span className="text-error ml-1 text-xs">*</span>}
              </td>
              <td className="p-3">
                <code className="text-primary text-sm">{prop.type}</code>
              </td>
              <td className="text-text-secondary p-3">
                {prop.defaultValue ? <code className="text-sm">{prop.defaultValue}</code> : '-'}
              </td>
              <td className="text-text-secondary p-3">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
