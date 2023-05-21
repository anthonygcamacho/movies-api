const consoleTableResults = (resp: any[]) => {
    let columns = resp.map((column) => {
        let charVarLen = ""
        if (column.character_maximum_length)
            charVarLen = `(${column.character_maximum_length})`
        return {
            Column: column.column_name,
            "Data Type": `${column.data_type}${charVarLen}`,
            "Is Nullable": column.is_nullable,
        }
    })
    console.table(columns)
}

export default consoleTableResults
