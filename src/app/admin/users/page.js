export default function UsersPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Users</h2>

      <table className="w-full bg-slate-900 rounded-xl overflow-hidden">
        <thead className="bg-slate-800 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-slate-800">
            <td className="p-3">Ahmed</td>
            <td>ahmed@mail.com</td>
            <td>User</td>
            <td>
              <button className="text-sky-400">Make Admin</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
