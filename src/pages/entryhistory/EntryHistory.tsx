import React, { useEffect, useState } from "react";
import Title from "@/components/Title/Title";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  DatePicker,
  Divider,
  Card,
} from "@nextui-org/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { columns } from "./data";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { toast, ToastContainer } from "react-toastify";
import { getEntryHistory } from "@/services/entryHistoryService";
import { IEntry } from "@/interfaces/EntryHistory";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const INITIAL_VISIBLE_COLUMNS = ["email", "house", "type", "date", "hour"];
const EntryHistory = () => {
  
  const [users, setUsers] = useState<IEntry[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "house",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Type of entry",
        data: [],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  });

  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Entries per day",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "House visits",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

   // Cargar datos al montar el componente
   useEffect(() => {
    fetchEntryHistory();
  }, []);

  const fetchEntryHistory = async () => {
    try {
      const data = await getEntryHistory();
      setUsers(data);
      updateChartData(data);
      updateLineChartData(data);
      updateBarChartData(data);
      toast.success("Entry history loaded successfully");
    } catch (error) {
      toast.error("Error loading entry history");
    }
  };

  function updateChartData(data) {
    const typeCounts = data.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {});

    setChartData({
      labels: Object.keys(typeCounts),
      datasets: [
        {
          label: "Type of entry",
          data: Object.values(typeCounts),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    });
  }

  function updateLineChartData(data) {
    const dateCounts = data.reduce((acc, entry) => {
      const date = new Date(entry.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    setLineChartData({
      labels: Object.keys(dateCounts),
      datasets: [
        {
          label: "Entries per day",
          data: Object.values(dateCounts),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    });
  }

  function updateBarChartData(data) {
    const houseCounts = data.reduce((acc, entry) => {
      acc[entry.house] = (acc[entry.house] || 0) + 1;
      return acc;
    }, {});

    setBarChartData({
      labels: Object.keys(houseCounts),
      datasets: [
        {
          label: "House visits",
          data: Object.values(houseCounts),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const onDateChange = (newDateRange) => {
    setDateRange(newDateRange);
    setIsDateSelected(newDateRange[0] !== null && newDateRange[1] !== null);
    setPage(1);
  };

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (filterValue) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          (user.email ? user.email.toLowerCase() : "").includes(
            filterValue.toLowerCase()
          ) ||
          (user.house ? user.house.toLowerCase() : "").includes(
            filterValue.toLowerCase()
          )
      );
    }

    if (isDateSelected && dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      const end = new Date(endDate).setHours(23, 59, 59, 999);

      filteredUsers = filteredUsers.filter((user) => {
        const userDate = new Date(user.date).setHours(0, 0, 0, 0);
        return userDate >= start && userDate <= end;
      });
    }

    return filteredUsers;
  }, [users, filterValue, dateRange, isDateSelected]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "date":
      case "house":
      case "entry place":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex flex-col flex-1 flex-wrap 2xl:flex-nowrap gap-4">
            <div className="flex gap-2">
              <DatePicker
                value={dateRange[0]}
                onChange={(date) => onDateChange([date, dateRange[1]])}
              />
              <DatePicker
                value={dateRange[1]}
                onChange={(date) => onDateChange([dateRange[0], date])}
              />
            </div>
            <Input
              isClearable
              className="w-full"
              placeholder="Search by house, entry place, or user"
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} entry history
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
    visibleColumns,
    onRowsPerPageChange,
    filteredItems.length,
    onSearchChange,
    dateRange,
  ]);

  const bottomContent = React.useMemo(() => {
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
            className="bg-indigo-500 text-white"
            isDisabled={page <= 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            className="bg-indigo-500 text-white"
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
        title="Entry History"
        description="Track entries, view charts, and explore more!"
      />
      <Table
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
        <TableBody
          emptyContent={
            isDateSelected ? "No history found" : "Please select a date range"
          }
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Divider className="my-10" />

      <Title
        title="Graphics"
        description="See the entry history in a visual way!"
      />

      <div className="grid grid-cols-1  xl:grid-cols-3 gap-4">
        <Card className="px-5 py-8 w-full">
          <label
            className="text-sm font-bold text-center mb-2"
            htmlFor="doughnutChart"
          >
            Type of entry
          </label>
          <Doughnut id="doughnutChart" updateMode="resize" data={chartData} />
        </Card>

        <Card className="px-5 py-8 col-span-2 w-full">
          <label
            className="text-sm font-bold text-center mb-2"
            htmlFor="lineChart"
          >
            Entries per day
          </label>
          <Line id="lineChart" updateMode="resize" data={lineChartData} />
        </Card>

        <Card className="px-5 py-8 col-span-2">
          <label
            className="text-sm font-bold text-center mb-2"
            htmlFor="barChart"
          >
            House visits
          </label>
          <Bar id="barChart" updateMode="resize" data={barChartData} />
        </Card>
      </div>
      <ToastContainer stacked />
    </div>
  );
};

export default EntryHistory;
