import React from "react";

export interface DiscountFormProps {
  users: any[];
  formData: { userId: number | ""; type: "amount" | "percentage"; value: number | "" };
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
  submitting: boolean;
  onCancel: () => void;
}

const DiscountForm: React.FC<DiscountFormProps> = ({
  users,
  formData,
  onChange,
  onSubmit,
  submitting,
  onCancel,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-1">User</label>
        <select
          value={formData.userId}
          onChange={(e) => onChange("userId", Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select user</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Discount Type</label>
        <select
          value={formData.type}
          onChange={(e) => onChange("type", e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="amount">Amount</option>
          <option value="percentage">Percentage</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-1">Value</label>
        <input
          type="number"
          value={formData.value}
          onChange={(e) => onChange("value", Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          min={0}
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          {submitting ? "Applying..." : "Apply Discount"}
        </button>
      </div>
    </div>
  );
};

export default DiscountForm;
