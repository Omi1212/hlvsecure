import React, { useEffect, useState, useMemo, useCallback } from "react";
import Title from "../../components/Title/Title";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Tooltip,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { ChevronDownIcon } from "../../assets/icons/ChevronDownIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "../../components/capitalize/utils";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import FormDetailsPermissions from "../../components/FormDetailsPermissions/FormDetailsPermissions";
import { toast, ToastContainer } from "react-toastify";
import { approvePermission, deletePermission, getPermissionsHouse } from "@/services/permissionService";
import { IManagePermissionsRequest } from "@/interfaces/Permissions";

const statusColorMap = {
  true: "success",
  false: "warning",
};

const statusTextMap = {
  true: "Approve",
  false: "No approve",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "user",
  "house",
  "fecha_inicio",
  "fecha_final",
  "hora_inicio",
  "hora_fin",
  "aprovado",
  "actions",
];

const ManagePermissions = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState<IManagePermissionsRequest[]>([]);
  const houseNumber = "1";

  // Fetch permissions
  const fetchPermissions = useCallback(async () => {
    if (!houseNumber) {
      toast.error("Error: House number is undefined");
      return;
    }

    try {
      const data = await getPermissionsHouse(houseNumber);
      setUsers(data);
    } catch (error) {
      toast.error("Error fetching permissions");
      console.error("Error fetching permissions:", error);
    }
  }, [houseNumber]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  // Approve permission
  const handleApprove = async (id_permission: string) => {
    try {
      await approvePermission(id_permission);
      toast.success("Permission approved successfully");
      fetchPermissions();
    } catch (error) {
      toast.error("Error approving permission");
      console.error("Error approving permission:", error);
    }
  };

  // Delete permission
  const handleDelete = async (id_permission: string) => {
    try {
      await deletePermission(id_permission);
      toast.success("Permission deleted successfully");
      fetchPermissions();
    } catch (error) {
      toast.error("Error deleting permission");
      console.error("Error deleting permission:", error);
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState(new Set(["true", "false"]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.user.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter.size && statusFilter.size !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        statusFilter.has(String(user.aprovado))
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (user, columnKey) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "aprovado":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[String(user.aprovado)]}
              size="sm"
              variant="flat"
            >
              {statusTextMap[String(user.aprovado)]}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Approve">
                <Button
                  onPress={() => handleApprove(user.id)}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  isIconOnly
                  variant="light"
                >
                  <EyeIcon />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Reject">
                <Button
                  onPress={() => handleDelete(user.id)}
                  className="text-lg text-danger hover:bg-danger-50 cursor-pointer active:opacity-50"
                  isIconOnly
                  variant="light"
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleApprove, handleDelete]
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} permissions
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
    onClear,
    rowsPerPage,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            className="bg-indigo-300"
            isDisabled={page <= 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            className="bg-indigo-300"
            isDisabled={page >= pages}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages]);

  return (
    <div className="container-tab">
      <Title
        title="Manage Permissions"
        description="Manage requested and granted permissions"
      />

      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No permissions found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ToastContainer stacked />
      {/* Modal de Details
      <Modal
        className="py-8"
        size="3xl"
        scrollBehavior={scrollBehavior}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Details Permissions
              </ModalHeader>
              <ModalBody>
                <FormDetailsPermissions />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </div>
  );
};

export default ManagePermissions;