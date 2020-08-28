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
];

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
];

const installationAreaColumns = () => [
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
];

const sectorColumns = () => [
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
];

const superiorEquipmentColumns = () => [
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
];

const workCenterColumns = () => [
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
];

const safetyParametersColumns = () => [
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
];

module.exports = {
  sectorColumns,
  equipmentColumns,
  workCenterColumns,
  machineTypeColumns,
  installationAreaColumns,
  superiorEquipmentColumns,
  safetyParametersColumns,
}