import { useState, useEffect } from "react";
import {
  CreditCard,
  DollarSign,
  IdCard,
  AlertTriangle,
  Dumbbell,
  Link,
  LogOut,
  Info,
} from "lucide-react";

interface CardButtonProps {
  icon: React.ReactNode;
  label: string;
}


const BASE_URL = import.meta.env.BASE_URL;

export default function CatCard() {
  const [showBarcode, setShowBarcode] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (showBarcode) {
      setProgress(100);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setShowBarcode(false);
            return 0;
          }
          return prev - 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [showBarcode]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#092f44] text-[#D1A540] font-sans">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Header with logos */}
        <div className="flex flex-row w-full max-w-sm p-2">
            <img
              src={BASE_URL + "Images/ucm3.png"}
              alt="UC Merced Logo"
              className="h-14 object-contain ml-3"
            />

          <img
            src={BASE_URL + "Images/mobileid_logo.png"}
            alt="CatCard Logo"
            className="items-center h-15 object-contain ml-10"
          />

        </div>

        <div className="w-90 h-0.25 bg-white rounded-full mb-5"></div>



        <div className="mt-6 flex flex-col items-center">
          {/* Profile */}
          <div className="w-28 h-28 rounded-full bg-gray-600 mb-2 overflow-hidden">
            <img
              src={BASE_URL + "Images/photo.jfif"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white font-medium text-base leading-tight">Steven Navas</p>
          

          {/* Barcode / Button */}
          {!showBarcode ? (
            <button
              onClick={() => setShowBarcode(true)}
              className="mt-4 bg-[#D1A540] text-[#0B344E] text-[16px] px-8 py-2 rounded-md font-bold text-med"
            >
              PAY / Check-in
            </button>
          ) : (

            <div className="flex flex-col items-center my-2 w-full">

              <p className="text-blue-400 text-med leading-tight">298737001</p>


              <img
                src={BASE_URL + "Images/barcode.jpg"}
                alt="Barcode"
                className="w-64 h-14 object-contain mb-2"
              />


              <div className="w-64 h-2 bg-gray-500 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D1A540] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-6 mt-10 max-w-xs w-full">
          <CardButton icon={<CreditCard className="w-8 h-8" />} label="Add Funds" />
          <CardButton icon={<DollarSign className="w-8 h-8" />} label="Balance" />
          <CardButton icon={<IdCard className="w-8 h-8" />} label="Lost My Card" />
          <CardButton icon={<AlertTriangle className="w-8 h-8" />} label="Emergency" />
          <CardButton icon={<Dumbbell className="w-8 h-8" />} label="Gym" />
          <CardButton icon={<Info className="w-8 h-8" />} label="Resources" />
          <CardButton icon={<Link className="w-8 h-8" />} label="Alynx" />
          <CardButton icon={<LogOut className="w-8 h-8" />} label="Log out" />
        </div>
      </div>
    </div>
  );
}

function CardButton({ icon, label }: CardButtonProps) {
  return (
    <button className="flex flex-col items-center justify-center p-1 rounded-2xl bg-[#224457] border-2 border-[#647c89] text-[#D1A540] shadow-md w-24 h-24">
      {icon}
      <span className="m-1 text-[14px] font-medium text-center leading-snug">{label}</span>
    </button>
  );
}

