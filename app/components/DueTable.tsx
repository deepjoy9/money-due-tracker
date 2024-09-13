import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DueAmount } from "./DueAmount";
import { CopyButton } from "./CopyButton";

interface Person {
  name: string;
  dueAmounts: { amount: number; description: string }[];
}

interface DueTableProps {
  people: Person[];
  onCopy: (person: Person) => void;
  totalDue: (dueAmounts: { amount: number; description: string }[]) => string;
}

export function DueTable({ people, onCopy, totalDue }: DueTableProps) {
  return (
    <div className="overflow-x-auto">
      {people.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Due Amounts</TableHead>
              <TableHead>Total Due</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.name}>
                <TableCell>{person.name}</TableCell>
                <TableCell>
                  {person.dueAmounts.map((due, index) => (
                    <DueAmount
                      key={index}
                      amount={due.amount}
                      description={due.description}
                      isFirst={index === 0}
                    />
                  ))}
                </TableCell>
                <TableCell>{totalDue(person.dueAmounts)}</TableCell>
                <TableCell>
                  <CopyButton onClick={() => onCopy(person)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4">
          <p className="text-lg font-medium">
            No outstanding amounts to track.
          </p>
          <p className="text-sm text-gray-500">
            Add new entries to start tracking due amounts.
          </p>
        </div>
      )}
    </div>
  );
}
