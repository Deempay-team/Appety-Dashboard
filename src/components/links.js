import {
    QueueIcon,
    ImageIcon,
    LinkIcon,
    OverviewIcon,
    StoreFrontIcon
  } from "../assests/icons/Icons";
  
//ADMIN LINK LIST
  export const adminLinks = [
    {
      name: "Overview",
      route: "/dashboard/admin/overview",
      icon: <OverviewIcon />,
      subLinks: null,
      keyWord: "overview",
    },
    {
        name: "Merchants",
        route: "/dashboard/admin/merchantlist",
        icon: <StoreFrontIcon />,
        subLinks: null,
        keyWord: "merchantlist",
    },
  ];
  
//MERCHANT LINK LIST
  export const merchantLinks = [
    {
      name: "Queues",
      route: "/dashboard/merchant/settings/queue",
      icon: <QueueIcon />,
      subLinks: null,
      keyWord: "queue",
    },
    {
        name: "Queuing Time",
        route: "/dashboard/merchant/settings/link",
        icon: <LinkIcon />,
        subLinks: null,
        keyWord: "link",
    },
    {
        name: "Image",
        route: "/dashboard/merchant/settings/image",
        icon: <ImageIcon />,
        subLinks: null,
        keyWord: "image",
    },
  ];