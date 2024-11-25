const columns = [
  { name: "EMAIL", uid: "user", sortable: true },
  { name: "HOUSE", uid: "house", sortable: true },
  { name: "INITIAL DATE", uid: "fecha_inicio", sortable: true },
  { name: "EXPIRATION DATE", uid: "fecha_final", sortable: true },
  { name: "DAYS", uid: "dias_semana", sortable: true },
  { name: "INITIAL HOUR", uid: "hora_inicio", sortable: true },
  { name: "FINAL HOUR", uid: "hora_fin", sortable: true },
  { name: "EXPIRATION TYPE", uid: "tipo_expiracion", sortable: true },
  { name: "STATUS", uid: "activo", sortable: true },
];

const statusOptions = [
  { name: "Active", uid: "true" },
  { name: "Expired", uid: "false" },
];

export { columns, statusOptions };
