'use client'

export const toolInputClass =
  'w-full rounded-[12px] text-[15px] transition-[border-color,box-shadow] outline-none ' +
  'bg-[#f9fafb] border border-[#e5e7eb] px-3 py-3 ' +
  'focus:border-[#3B82F6] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]'

export const toolLabelClass = 'block text-[13px] font-medium text-[#374151] mb-1.5'

export function ToolInput(
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  return <input {...props} className={[toolInputClass, props.className].filter(Boolean).join(' ')} />
}

export function ToolSelect(
  props: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
) {
  return <select {...props} className={[toolInputClass, 'cursor-pointer', props.className].filter(Boolean).join(' ')} />
}
