---
title: MySQL
---

## LocalDateTime.now()与实际插入时间不同

> [bug#93444](https://bugs.mysql.com/bug.php?id=93444)，
> 版本 [8.0.22](https://dev.mysql.com/doc/relnotes/connector-j/en/news-8-0-22.html) 修复。

**背景**：DDL 中使用 `DATETIME` 类型，JavaBean 使用 `LocalDateTime` 类型，`datasource.url` 中的 `serverTimezone` 与系统时区不一致时，
`LocalDateTime.now()` 的 `insert` 时间可能发生变化。

**例如**，`serverTimezone=Asia/Shanghai`（UTC+8），但系统时区为 `Asia/Novosibirsk`（新西伯利亚，UTC+7），那么实际存储的时间就会比系统当前时间快
1 个小时。

**原因**：`mysql-connector-java.version <= 8.0.21`，`com.mysql.cj.ClientPreparedQueryBindings#setTimestamp` 方法会把
`LocalDateTime` 转换到 `serverTimezone` 的时区。

```java {13,14} "getServerTimeZone" title="com.mysql.cj.ClientPreparedQueryBindings#setTimestamp 源码"
@Override
public void setTimestamp(int parameterIndex, Timestamp x, Calendar targetCalendar, int fractionalLength) {
    if (x == null) {
        setNull(parameterIndex);
    } else {
        // 省略部分代码

        StringBuffer buf = new StringBuffer();

        if (targetCalendar != null) {
            buf.append(TimeUtil.getSimpleDateFormat("''yyyy-MM-dd HH:mm:ss", targetCalendar).format(x));
        } else {
            this.tsdf = TimeUtil.getSimpleDateFormat(this.tsdf, "''yyyy-MM-dd HH:mm:ss", this.session.getServerSession().getServerTimeZone());
            buf.append(this.tsdf.format(x));
        }

        setValue(parameterIndex, buf.toString(), MysqlType.TIMESTAMP);
    }
}
```

**修复**：建议更新到 [8.0.25](https://mvnrepository.com/artifact/mysql/mysql-connector-java/8.0.25) 版本，或最新版本。
