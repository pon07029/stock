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
import { infoType } from "@/app/[tiker]/page";
import { calculateTotalScore } from "@/lib/math";

function StockBox({ data }: { data:infoType }) {
  const router = useRouter();
  const go = () => {
    router.push("/" + data.ticker);
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
            src={`https://storage.googleapis.com/iex/api/logos/${data.ticker}.png`}
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
            {/* <TableColumn>price</TableColumn> */}
            <TableColumn>epsScore</TableColumn>
            <TableColumn>PBScore</TableColumn>
            <TableColumn>total</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              {/* <TableCell>{data.price}</TableCell> */}
              <TableCell>{data.epsScore}</TableCell>
              <TableCell>{data.perBandScore}</TableCell>
              <TableCell>{calculateTotalScore(data.epsScore, data.perBandScore)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default StockBox;
