
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const steps = ["Select Date", "Select Time", "Visitor Details", "Contact Details"];

interface BookingProgressProps {
  currentStep: number;
}

const Step = ({
  step,
  label,
  isCurrent,
  isCompleted,
}: {
  step: number;
  label: string;
  isCurrent: boolean;
  isCompleted: boolean;
}) => (
  <div className="flex flex-col items-center text-center w-24">
    <div
      className={cn(
        "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
        isCompleted
          ? "bg-primary border-primary text-primary-foreground"
          : "border-border",
        isCurrent ? "border-primary" : "border-border"
      )}
    >
      {isCompleted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <div
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            isCurrent ? "bg-primary" : "bg-background"
          )}
        />
      )}
    </div>
    <p
      className={cn(
        "mt-2 text-xs sm:text-sm transition-colors duration-300",
        isCurrent ? "text-primary font-semibold" : "text-muted-foreground"
      )}
    >
      {label}
    </p>
  </div>
);

const Line = ({ isCompleted }: { isCompleted: boolean }) => (
  <div className="flex-1 h-0.5 mx-2 bg-border">
    <div
      className={cn(
        "h-full bg-primary transition-all duration-500",
        isCompleted ? "w-full" : "w-0"
      )}
    />
  </div>
);

export function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="w-full py-6 sm:py-8">
      <div className="flex items-start justify-center max-w-2xl mx-auto px-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          return (
            <React.Fragment key={label}>
              <Step
                step={stepNumber}
                label={label}
                isCurrent={currentStep === stepNumber}
                isCompleted={currentStep > stepNumber}
              />
              {index < steps.length - 1 && (
                <Line isCompleted={currentStep > stepNumber} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
