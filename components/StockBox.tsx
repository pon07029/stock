import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { useRouter } from "next/navigation";

function StockBox({ score, ticker }: { score: number[]; ticker: string }) {
  const router = useRouter();
  const go = () => {
    router.push("/" + ticker);
  };
  return (
    <Card isPressable onPress={go} className="w-full">
      <CardBody className="flex flex-row">
        <div className="mr-3 mt-1 ">
          <Avatar
            size="lg"
            isBordered
            radius="sm"
            className="mb-1"
            src={`https://storage.googleapis.com/iex/api/logos/${ticker}.png`}
          />
          <p className="font-bold text-green-400 text-center">9.2</p>
        </div>

        <Table
          removeWrapper
          aria-label="Example static collection table"
          className="flex-1 flex"
          align="center"
        >
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              {score.map((item, i) => (
                <TableCell key={i}>{item}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default StockBox;
