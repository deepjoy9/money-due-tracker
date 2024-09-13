"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddDueForm } from "./AddDueForm";
import { DueTable } from "./DueTable";
import { toast } from "@/hooks/use-toast";

interface DueAmount {
  amount: number;
  description: string;
}

interface Person {
  name: string;
  dueAmounts: DueAmount[];
}

export default function MoneyTracker() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    const storedPeople = localStorage.getItem("people");
    if (storedPeople) {
      setPeople(JSON.parse(storedPeople));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  const addDueAmount = (name: string, amount: number, description: string) => {
    setPeople((prevPeople) => {
      const existingPersonIndex = prevPeople.findIndex((p) => p.name === name);
      if (existingPersonIndex > -1) {
        const updatedPeople = [...prevPeople];
        updatedPeople[existingPersonIndex].dueAmounts.push({
          amount,
          description,
        });
        return updatedPeople;
      } else {
        return [...prevPeople, { name, dueAmounts: [{ amount, description }] }];
      }
    });
  };

  const copyToClipboard = (person: Person) => {
    const message = `
Money due from ${person.name}:

${person.dueAmounts
  .map((due) => `${due.amount.toFixed(2)} - ${due.description}`)
  .join("\n")}

Total due: ${totalDue(person.dueAmounts)}
    `.trim();

    navigator.clipboard
      .writeText(message)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: `Details for ${person.name} have been copied to your clipboard.`,
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast({
          title: "Failed to copy",
          description: "There was an error copying the text to your clipboard.",
          variant: "destructive",
        });
      });
  };

  const totalDue = (dueAmounts: DueAmount[]) =>
    dueAmounts.reduce((sum, due) => sum + due.amount, 0).toFixed(2);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Money Due Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AddDueForm
          onSubmit={addDueAmount}
          existingNames={people.map((p) => p.name)}
        />
        <DueTable
          people={people}
          onCopy={copyToClipboard}
          totalDue={totalDue}
        />
      </CardContent>
    </Card>
  );
}
