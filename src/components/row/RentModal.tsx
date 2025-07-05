"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CategoryInput from "./CategoryInput";
import Counter from "./Counter";
import CountrySelect from "./CountrySelect";
import { Button } from "@/components/ui/button";
import { categories } from "./Categories";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  PRICE = 3,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isOpen, setIsOpen] = useState(false);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <DialogHeader>
        <DialogTitle>
          Which of these best describes your place?
        </DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={() => {}}
              selected={false}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>
            Where is your place located?
          </DialogTitle>
        </DialogHeader>
        <CountrySelect
          onChange={() => {}}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>
            Share some basics about your place
          </DialogTitle>
        </DialogHeader>
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={1}
          onChange={() => {}}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={1}
          onChange={() => {}}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>
            Now, set your price
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="font-semibold">
            How much do you charge per night?
          </div>
          <input
            type="number"
            className="w-full p-4 border rounded-lg"
            placeholder="100"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Rent your home
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          {bodyContent}
          <div className="flex flex-row items-center gap-4 mt-6">
            {step !== STEPS.CATEGORY && (
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
            )}
            <Button onClick={onNext}>
              {step === STEPS.PRICE ? 'Create' : 'Next'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RentModal;
