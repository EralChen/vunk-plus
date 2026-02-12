import { describe, expect, it } from 'vitest'
import { defaultRender } from '../src/const'

describe('broadcasting-markdown const', () => {
  it('renders the provided markdown quiz text to plain text', () => {
    const md = `**回答错误！**  
正确答案是：**C) 硬盘**

**解析：**  
微型计算机的**主机**部分主要包括CPU、内存和主板（含芯片组等核心电路），而硬盘属于外部存储设备，通常归类为外设或辅助存储，不属于主机内部核心组成部分。

---  
（等待用户继续输入“开始答题”或“结束答题”）`

    const rendered = defaultRender(md)

    expect(rendered).toContain('回答错误！')
    expect(rendered).toContain('正确答案是：C) 硬盘')
    expect(rendered).toContain('解析：')
    expect(rendered).toContain('微型计算机的主机部分主要包括CPU、内存和主板（含芯片组等核心电路）')
    expect(rendered).toContain('（等待用户继续输入“开始答题”或“结束答题”）')

    expect(rendered).not.toContain('**')
    expect(rendered).not.toContain('---')
  })
})
