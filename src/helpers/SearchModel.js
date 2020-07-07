const machineTypeColumns = () => [
  {
    name: "ID",
    property:"id",
    defaultValue: "Sem ID",
  },
  {
    name: "Descrição",
    property:"description",
    defaultValue: "Sem Descrição",
  },
]

const equipmentColumns = () => [
  {
    name: "Código",
    property:"code",
    defaultValue: "Sem Código",
  },
  {
    name: "Descrição",
    property:"description",
    defaultValue: "Sem Descrição",
  },
  {
    name: "Tipo Máquina",
    property:"machineType.description",
    defaultValue: "Sem Tipo de Máquina",
  },
]

module.exports = {
  machineTypeColumns,
  equipmentColumns,
}