import { useState } from "react";
import {
  HiOutlinePaperAirplane,
  HiOutlineEmojiHappy,
  HiOutlinePaperClip,
} from "react-icons/hi";

const ChatContainer = () => {
  const [channels] = useState([
    { id: 1, name: "General", unread: false },
    { id: 2, name: "Proyecto Alpha", unread: true },
    { id: 3, name: "Diseño UI", unread: false },
    { id: 4, name: "Desarrollo Backend", unread: false },
  ]);

  const [activeChannel, setActiveChannel] = useState(1);

  const [messages] = useState([
    {
      id: 1,
      user: "Ana López",
      text: "¿Alguien ha revisado el nuevo diseño?",
      time: "10:15 AM",
    },
    {
      id: 2,
      user: "Juan Pérez",
      text: "Sí, lo revisé ayer. Necesitamos ajustar la sección de perfil",
      time: "10:17 AM",
    },
    {
      id: 3,
      user: "Tú",
      text: "Voy a hacer esos cambios hoy mismo",
      time: "10:20 AM",
    },
    {
      id: 4,
      user: "Carlos Martínez",
      text: "¿Podemos programar una reunión para revisar los avances?",
      time: "10:25 AM",
    },
    {
      id: 5,
      user: "María González",
      text: "Sugiero mañana a las 10 AM",
      time: "10:30 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      // Aquí iría la lógica para enviar el mensaje
      setNewMessage("");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 h-full flex">
      {/* Sidebar de canales */}
      <div className="w-64 border-r border-gray-200 pr-6 mr-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Canales</h2>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm">
            + Nuevo canal
          </button>
        </div>

        <div className="space-y-2">
          {channels.map((channel) => (
            <button
              key={channel.id}
              className={`w-full text-left px-4 py-2 rounded-md ${
                activeChannel === channel.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveChannel(channel.id)}
            >
              <div className="flex items-center">
                <span className="mr-2">#</span>
                <span className="flex-1">{channel.name}</span>
                {channel.unread && (
                  <span className="bg-red-500 rounded-full w-2 h-2"></span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">
            Mensajes Directos
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
              <div className="h-6 w-6 rounded-full bg-gray-300 mr-2"></div>
              <span>Ana López</span>
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
              <div className="h-6 w-6 rounded-full bg-gray-300 mr-2"></div>
              <span>Juan Pérez</span>
            </button>
            <button className="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
              <div className="h-6 w-6 rounded-full bg-gray-300 mr-2"></div>
              <span>Carlos Martínez</span>
            </button>
          </div>
        </div>
      </div>

      {/* Área de chat principal */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {channels.find((c) => c.id === activeChannel)?.name || "General"}
          </h2>
          <p className="text-sm text-gray-500">6 miembros en línea</p>
        </div>

        <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg ${
                message.user === "Tú" ? "bg-indigo-50 ml-8" : "bg-gray-50 mr-8"
              }`}
            >
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex-shrink-0 mr-3 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {message.user.charAt(0)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span
                      className={`font-medium ${
                        message.user === "Tú"
                          ? "text-indigo-700"
                          : "text-gray-700"
                      }`}
                    >
                      {message.user}
                    </span>
                    <span className="text-xs text-gray-500">
                      {message.time}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <HiOutlinePaperClip className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <HiOutlineEmojiHappy className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-2 flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="block w-full rounded-none rounded-l-md pl-3 py-3 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={`Enviar mensaje a #${
                  channels.find((c) => c.id === activeChannel)?.name ||
                  "General"
                }...`}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
            </div>
            <button
              onClick={handleSend}
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-3 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <HiOutlinePaperAirplane className="h-5 w-5 text-indigo-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
