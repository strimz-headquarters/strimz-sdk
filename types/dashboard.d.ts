export type SideBarLinksTypes = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

export type TxPropsTypes = {
  title: string;
  date: string;
  amount: string;
  token: "USDC" | "USDT";
  status: "Completed" | "Failed" | "In progress";
};

export type CVSDataType = {
  name: string;
  address: `0x${string}`;
  amount: number;
};

export type TableDataType = {
  id: number;
  name: string;
  address: string;
  amount: number;
  isEditing?: boolean;
};
