import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function ModalCriarTurma({ onCreate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    vagas: "",
    turno: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validação básica
    if (!formData.vagas || !formData.turno) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    if (onCreate) {
      onCreate(formData);
      setFormData({ vagas: "", turno: "" }); // limpa depois de criar
      setIsOpen(false); // fecha o modal
    }
  }

  function closeModal() {
    setIsOpen(false);
    setFormData({ vagas: "", turno: "" }); // limpa ao fechar
  }

  return (
    <>
      {/* Botão que abre o modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Criar Turma
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Container centralizado */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-md w-full bg-white rounded-xl shadow-2xl transform transition-all">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <DialogTitle className="text-xl font-bold text-gray-900">
                Criar Nova Turma
              </DialogTitle>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Campo Vagas */}
                <div>
                  <label
                    htmlFor="vagas"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Quantidade de Vagas *
                  </label>
                  <input
                    type="number"
                    id="vagas"
                    name="vagas"
                    value={formData.vagas}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Ex: 30"
                    min="1"
                    required
                  />
                </div>

                {/* Campo Turno */}
                <div>
                  <label
                    htmlFor="turno"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Turno *
                  </label>
                  <select
                    id="turno"
                    name="turno"
                    value={formData.turno}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Selecione o turno...</option>
                    <option value="MATUTINO">Matutino</option>
                    <option value="VESPERTINO">Vespertino</option>
                    <option value="NOTURNO">Noturno</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Criar Turma
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
