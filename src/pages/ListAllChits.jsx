import { Grid } from "@mui/material";
import ChitCard from "../components/ChitCard"; 
import CreateNewChit from "../components/CreateNewChit";

export default function ListAllChits() {

  const mockChits = [
    {
      name: "Chit 1",
      duration: 12, 
      totalPeople: 5,
      totalAmount: 60000,
      monthlyPayment: 5000,
      startDate: "2024-01-01",
    },
    {
      name: "Chit 2",
      duration: 24,
      totalPeople: 10,
      totalAmount: 120000,
      monthlyPayment: 5000,
      startDate: "2023-06-01",
    },
    {
      name: "Chit 3",
      duration: 18,
      totalPeople: 8,
      totalAmount: 80000,
      monthlyPayment: 4444,
      startDate: "2022-11-01",
    },
    {
      name: "Chit 4",
      duration: 6,
      totalPeople: 3,
      totalAmount: 30000,
      monthlyPayment: 5000,
      startDate: "2024-03-01",
    },
    {
      name: "Chit 5",
      duration: 36,
      totalPeople: 12,
      totalAmount: 180000,
      monthlyPayment: 5000,
      startDate: "2020-05-01",
    },
    {
      name: "Chit 6",
      duration: 24,
      totalPeople: 6,
      totalAmount: 72000,
      monthlyPayment: 3000,
      startDate: "2023-01-01",
    },
    {
      name: "Chit 7",
      duration: 15,
      totalPeople: 7,
      totalAmount: 105000,
      monthlyPayment: 7000,
      startDate: "2021-06-01",
    },
    {
      name: "Chit 8",
      duration: 9,
      totalPeople: 4,
      totalAmount: 36000,
      monthlyPayment: 4000,
      startDate: "2024-02-01",
    },
    {
      name: "Chit 9",
      duration: 12,
      totalPeople: 6,
      totalAmount: 72000,
      monthlyPayment: 6000,
      startDate: "2022-09-01",
    },
    {
      name: "Chit 10",
      duration: 30,
      totalPeople: 15,
      totalAmount: 150000,
      monthlyPayment: 5000,
      startDate: "2021-03-01",
    },
  ];

  return (
    <Grid container spacing={3} sx={{justifyContent: "center", alignItems: "center", padding: "20px"}}>
      {mockChits.map((chit, index) => (
        <ChitCard key={index} chit={chit} />
      ))}
      <CreateNewChit/>
    </Grid>
  );
}
