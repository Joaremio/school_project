import Sidebar from "../layout/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Aqui vai o conteúdo da página */}
        <h1>Bem-vindo!</h1>
      </div>
    </div>
  );
}
