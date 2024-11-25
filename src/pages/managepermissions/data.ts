const columns = [
  { name: "ID", uid: "id", sortable : true },
  { name: "USER", uid: "user", sortable: true },
  { name: "HOUSE", uid: "house", sortable: true },
  { name: "START DATE", uid: "fecha_inicio", sortable: true },
  { name: "END DATE", uid: "fecha_final", sortable: true },
  { name: "START TIME", uid: "hora_inicio", sortable: true },
  { name: "END TIME", uid: "hora_fin", sortable: true },
  { name: "DAY OF WEEK", uid: "dayOfWeek", sortable: true },
  { name: "STATUS", uid: "aprovado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "true" },
  { name: "Expired", uid: "false" },
];

export { columns, statusOptions };
