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

function StockBox({ score }: { score: number[] }) {
  return (
    <Card isPressable className="w-full">
      <CardBody className="flex flex-row">
        <div className="mr-3 mt-1 ">
          <Avatar
            size="lg"
            isBordered
            radius="sm"
            className="mb-1"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
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
