import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([
    { id: "1", label: "Full Name", type: "text", required: true },
    { id: "2", label: "Email", type: "email", required: true },
    { id: "3", label: "Phone", type: "tel", required: true },
  ]);

  const [formSettings, setFormSettings] = useState({
    isOpen: true,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
  });

  const addNewField = () => {
    setFields([
      ...fields,
      { id: Date.now().toString(), label: "New Field", type: "text", required: false },
    ]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Form Builder
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Customize your admission form
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Form Fields
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg"
                >

                  {/* Drag icon */}
                  <div className="hidden sm:block mt-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 space-y-3">

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                      <div>
                        <Label className="text-xs sm:text-sm">Field Label</Label>
                        <Input
                          value={field.label}
                          onChange={(e) =>
                            updateField(field.id, { label: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <Label className="text-xs sm:text-sm">Field Type</Label>
                        <select
                          className="w-full rounded-md border px-3 py-2 text-sm"
                          value={field.type}
                          onChange={(e) =>
                            updateField(field.id, { type: e.target.value })
                          }
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="tel">Phone</option>
                          <option value="date">Date</option>
                          <option value="select">Dropdown</option>
                        </select>
                      </div>

                    </div>

                    {/* Bottom row */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                      <div className="flex items-center gap-2">
                        <Switch
                          checked={field.required}
                          onCheckedChange={(checked) =>
                            updateField(field.id, { required: checked })
                          }
                        />
                        <Label className="text-xs sm:text-sm">
                          Required
                        </Label>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeField(field.id)}
                        className="text-red-600 w-full sm:w-auto"
                      >
                        <Trash2 className="h-4 w-4 mr-2 sm:mr-0" />
                        <span className="sm:hidden">Delete</span>
                      </Button>

                    </div>

                  </div>
                </div>
              ))}

              <Button onClick={addNewField} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-4 sm:space-y-6">

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Settings
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="flex justify-between items-center">
                <Label className="text-sm">Form Status</Label>
                <Switch
                  checked={formSettings.isOpen}
                  onCheckedChange={(checked) =>
                    setFormSettings({ ...formSettings, isOpen: checked })
                  }
                />
              </div>

              <Separator />

              <div>
                <Label className="text-sm">Start Date</Label>
                <Input type="date" value={formSettings.startDate} />
              </div>

              <div>
                <Label className="text-sm">End Date</Label>
                <Input type="date" value={formSettings.endDate} />
              </div>

              <Button className="w-full">Save</Button>

            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Preview
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {fields.map((field) => (
                <div key={field.id}>
                  <Label className="text-sm">
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Label>
                  <Input disabled placeholder={`Enter ${field.label}`} />
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default FormBuilder;