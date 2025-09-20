---
title: "命令"
---

## PowerShell查询进程创建时间

```python {6-8} "%s"
from datetime import datetime
import re
import subprocess

ps_query_process_create_time = """
    Get-CimInstance -ClassName Win32_Process -Filter "Name='%s'" \
    | Select-Object -ExpandProperty CreationDate \
    | ForEach-Object { Get-Date $_ -Format "yyyyMMddHHmmss.ffffff" }
""".strip()

process_name = "python.exe"

result = subprocess.run(
    ["powershell", ps_query_process_create_time % process_name],
    capture_output=True,
    check=True,
)
times_as_bytes: list[bytes] = re.findall(rb"\d+\.\d+", result.stdout)
times_as_str: list[str] = [time.decode("utf-8") for time in times_as_bytes]
return [datetime.strptime(t, "%Y%m%d%H%M%S.%f") for t in times_as_str]
```

<details>
<summary>使用 cmd.exe 命令</summary>

:::danger[从 Windows 11 的 24H2 版本开始，`WMIC` 不再预装]
来源：https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/features-on-demand-non-language-fod?view=windows-11#wmic

```cmd frame="none"
wmic process where "name='python.exe'" get creationdate | findstr /v "CreationDate"
```
:::
</details>
