import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

function SkillsChart({ skills = [] }) {
  if (!skills || skills.length === 0) {
    return (
      <div className="chart-box">
        <h2>📊 Skills Distribution</h2>
        <p>No skills data available.</p>
      </div>
    );
  }

  return (
    <div className="chart-box">
      <h2>📊 Skills Distribution</h2>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={skills}
              cx="50%"
              cy="45%"
              outerRadius={90}
              innerRadius={45}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {skills.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SkillsChart;