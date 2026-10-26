function createMeterService() {
  const fake = [
    { id: "M001", serialNumber: "SN-1001", status: "active", feeder: "F1" },
    { id: "M002", serialNumber: "SN-1002", status: "inactive", feeder: "F2" },
  ];

  async function list({ page, limit, status }) {
    let items = fake;
    if (status) items = items.filter((m) => m.status === status);
    const total = items.length;
    const start = (page - 1) * limit;
    return { items: items.slice(start, start + limit), total };
  }

  async function getById(id) {
    return fake.find((m) => m.id === id) || null;
  }

  async function consumption(id, { from, to }) {
    if (!(await getById(id))) return null;
    return [
      { timestamp: "2026-10-01T00:00:00Z", kwh: 1.25 },
      { timestamp: "2026-10-01T01:00:00Z", kwh: 0.98 },
    ];
  }

  return { list, getById, consumption };
}
module.exports = { createMeterService };
