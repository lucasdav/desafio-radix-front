import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Avatar,
} from "@mui/material";
import styles from "../../styles/styles.module.scss";
import useEquipments from "../../hooks/useEquipments";
import EquipmentForm from "../../components/EquipmentForm";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { EquipmentsRegistrationData } from "../../services/registerEquipments/type";
import { useMutation } from "react-query";
import registerEquipments from "../../services/registerEquipments";
import deleteEquipments from "../../services/deleteEquipments";
import { formatDayMonth, formatTableDate } from "../../util/formatMask";
import getEquipmentById from "../../services/getEquipmentById";
import { AxiosError } from "axios";
import registerEquipmentById from "../../services/registerEquipmentById";
import { BarChart } from "@mui/x-charts";
import getUserName from "../../hooks/useUserInfos";

export default function Home() {
  const { data: equipmentsData } = useEquipments();
  const [open, setOpen] = useState(false);
  const [newEquipments, setNewEquipments] = useState<
    EquipmentsRegistrationData[]
  >([]);
  const [selectedEquipment, setSelectedEquipment] = useState<
    EquipmentsRegistrationData | undefined
  >(undefined);
  const [selectedValue, setSelectedValue] = useState(3);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const [averageValue, setAverageValue] = useState<number>(0);
  const [equipmentsByPeriodSelected, setEquipmentsByPeriodSelected] = useState<
    EquipmentsRegistrationData[] | undefined
  >([]);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      window.location.href = '/';
    } else {
      setIsVerified(true);
    }
  }, []);

  const { fullName, avatarInitials } = getUserName();

  const submitEquipmentData = async (data: EquipmentsRegistrationData) => {
    try {
      await getEquipmentById(data.equipmentId);
      return registerEquipmentById(data.equipmentId, data);
    } catch (error) {
      const typedError = error as AxiosError;
      if (typedError.response && typedError.response.status === 404) {
        return registerEquipments(data);
      } else {
        throw typedError;
      }
    }
  };

  const mutation = useMutation(
    (data: EquipmentsRegistrationData) => submitEquipmentData(data),
    {
      onSuccess: (data) => {
        console.log("Data saved successfully:", data);
        setNewEquipments([]);
        window.location.reload();
      },
      onError: (error: Error) => {
        console.error("Error saving data:", error);
      },
    }
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const dataWithoutHeader = result.data.slice(1);
          const parsedData = dataWithoutHeader
            .map((item: unknown) => ({
              equipmentId: (item as unknown[])[0] as string,
              timestamp: (item as unknown[])[1] as string,
              value: Number((item as unknown[])[2]),
            }))
            .filter(
              (equipment) => equipment.equipmentId && !isNaN(equipment.value)
            );
          setNewEquipments(parsedData);
        },
        header: false,
      });
    }
  };

  const handleSave = () => {
    newEquipments.forEach((equipment) => {
      mutation.mutate(equipment);
    });
  };

  const deleteMutation = useMutation(
    (equipmentId: string) => {
      deleteEquipments(equipmentId);
      console.log(`Deleting equipment with ID: ${equipmentId}`);
      return Promise.resolve();
    },
    {
      onSuccess: () => {
        console.log("Equipment deleted successfully");
      },
      onError: (error: Error) => {
        console.error("Error deleting equipment:", error);
      },
    }
  );

  const handleEdit = (equipment: EquipmentsRegistrationData) => {
    setSelectedEquipment(equipment);
    handleOpen();
  };

  function calculateAverageValue(
    equipments: EquipmentsRegistrationData[],
    selectedOption: number
  ): number {
    const now = new Date();

    const filteredEquipments = equipments.filter((equipment) => {
      const equipmentDate = new Date(equipment.timestamp);
      switch (selectedOption) {
        case 1: // 24 horas
          return now.getTime() - equipmentDate.getTime() < 24 * 60 * 60 * 1000;
        case 2: // 48 horas
          return now.getTime() - equipmentDate.getTime() < 48 * 60 * 60 * 1000;
        case 3: // 1 semana
          return (
            now.getTime() - equipmentDate.getTime() < 7 * 24 * 60 * 60 * 1000
          );
        case 4: // 1 mes
          return (
            now.getTime() - equipmentDate.getTime() < 30 * 24 * 60 * 60 * 1000
          );
        default:
          return false;
      }
    });

    const totalValue = filteredEquipments.reduce(
      (acc, curr) => acc + curr.value,
      0
    );
    const averageValue =
      filteredEquipments.length > 0
        ? totalValue / filteredEquipments.length
        : 0;
    return averageValue;
  }

  useEffect(() => {
    const average = calculateAverageValue(equipmentsData || [], selectedValue);
    const equipmentsByPeriod = returnEquipmentsByPeriod(
      equipmentsData || [],
      selectedValue
    );
    setAverageValue(average);
    setEquipmentsByPeriodSelected(equipmentsByPeriod);
  }, [equipmentsData, selectedValue]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setSelectedValue(value);
  };

  function returnEquipmentsByPeriod(
    equipments: EquipmentsRegistrationData[],
    selectedOption: number
  ): EquipmentsRegistrationData[] | undefined {
    return equipments.filter((equipment) => {
      const now = new Date();
      const equipmentDate = new Date(equipment.timestamp);
      switch (selectedOption) {
        case 1: // 24 horas
          return now.getTime() - equipmentDate.getTime() < 24 * 60 * 60 * 1000;
        case 2: // 48 horas
          return now.getTime() - equipmentDate.getTime() < 48 * 60 * 60 * 1000;
        case 3: // 1 semana
          return (
            now.getTime() - equipmentDate.getTime() < 7 * 24 * 60 * 60 * 1000
          );
        case 4: // 1 mes
          return (
            now.getTime() - equipmentDate.getTime() < 30 * 24 * 60 * 60 * 1000
          );
        default:
          return false;
      }
    });
  }

  const chartValues =
    equipmentsByPeriodSelected?.map((equipment) => equipment.value) || [];
  const chartLabels =
    equipmentsByPeriodSelected?.map(
      (equipment) =>
        `${equipment.equipmentId} - ${formatDayMonth(equipment.timestamp)}`
    ) || [];

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
     isVerified ? (
      <div className="p-6">
      <header>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Avatar>{avatarInitials}</Avatar>
            <h1 className={styles.h1Styled}>{fullName}</h1>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Sair
            </Button>
          </div>

          <div className="flex justify-end items-center space-x-4">
            <label htmlFor="file">Importar Base CSV</label>
            <Input
              type="file"
              inputProps={{ accept: ".csv" }}
              onChange={handleFileChange}
              sx={{
                border: "1px solid #e5e7eb",
                padding: "1rem",
                margin: "0.5rem",
              }}
            />

            {newEquipments.length > 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSave}
              >
                Salvar Equipamentos
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="flex mt-8">
        <div className="justify-center w-1/2">
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Novo equipamento
          </Button>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>equipmentId</TableCell>
                <TableCell>timestamp</TableCell>
                <TableCell>value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipmentsData &&
                equipmentsData.length > 0 &&
                equipmentsData?.map((equipment, index) => (
                  <TableRow key={`row-${index}-${equipment.equipmentId}`}>
                    <TableCell>{equipment.equipmentId}</TableCell>
                    <TableCell>
                      {formatTableDate(equipment.timestamp)}
                    </TableCell>
                    <TableCell>{equipment.value}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => handleEdit(equipment)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          if (window.confirm("Confirmar exclusão?")) {
                            deleteMutation.mutate(equipment.equipmentId);
                          }
                        }}
                      >
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <Box
          sx={{
            backgroundColor: "black",
            width: "2px",
            height: "600px",
            margin: "24px",
          }}
        ></Box>
        <div className="w-1/2">
          <h2 className="mt-4">Visualize o valor médio de cada sensor</h2>
          <div className="flex">
            <FormControl sx={{ width: "200px", marginTop: "16px" }}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Selecione o período
              </InputLabel>
              <NativeSelect
                defaultValue={selectedValue}
                inputProps={{
                  name: "period",
                  id: "uncontrolled-native",
                }}
                onChange={handleChange}
              >
                <option value={1}>24 horas</option>
                <option value={2}>48 horas</option>
                <option value={3}>1 semana</option>
                <option value={4}>1 mês</option>
              </NativeSelect>
            </FormControl>
            <h3 className="mt-4">Valor médio: {averageValue}</h3>
          </div>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: chartLabels,
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: chartValues,
                },
              ]}
              width={selectedValue === 4 ? 1000 : 700}
              height={450}
            />
          </div>
        </div>
      </div>
      <EquipmentForm
        open={open}
        handleClose={handleClose}
        equipment={selectedEquipment}
      />
    </div>
  ) : <></>
  );
}
