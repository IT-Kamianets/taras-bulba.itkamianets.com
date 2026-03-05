"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Locale = "UK" | "EN" | "DE" | "FR" | "PL";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "UK", label: "UA" },
  { code: "EN", label: "EN" },
  { code: "DE", label: "DE" },
  { code: "FR", label: "FR" },
  { code: "PL", label: "PL" },
];

export const BOOKING_URL =
  "https://www.agoda.com/ru-ru/taras-bulba/hotel/all/kamenets-podolskiy-ua.html?countryId=79&finalPriceView=1&isShowMobileAppPrice=false&cid=1934116&numberOfBedrooms=&familyMode=false&adults=2&children=0&rooms=1&maxRooms=0&checkIn=2026-03-31&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=1&showReviewSubmissionEntry=false&currencyCode=UAH&isFreeOccSearch=false&tag=J2CHYWM7KFTMGXYK&los=1&searchrequestid=03e2977a-d978-424e-a097-4547873a402f&ds=W4Zs9ztR2EUe5LvY";

export const MENU_URL = "https://taras-bulba.choiceqr.com/menu/section:menyu/menyu-neskorenih";

const ROOM_IMAGES = [
  ["/logo/Apartments1.jpg", "/logo/Apartments2.jpg", "/logo/Apartments3jpg.jpg", "/logo/Apartments4.jpg"],
  ["/logo/Studio_apartments1.jpg", "/logo/Studio_apartments2.jpg", "/logo/Studio_apartments3.jpg", "/logo/Studio_apartments4.jpg"],
  ["/logo/Family_suite1.jpg", "/logo/Family_suite2.jpg", "/logo/Family_suite3.jpg", "/logo/Family_suite4.jpg"],
  ["/logo/Family_room1.jpg", "/logo/Family_room2.jpg", "/logo/Family_room3.jpg", "/logo/Family_room4.jpg"],
  ["/logo/Superior_Room_with_Twin_Beds1.jpg", "/logo/Superior_Room_with_Twin_Beds2.jpg", "/logo/Superior_Room_with_Twin_Beds3.jpg", "/logo/Superior_Room_with_Twin_Beds4.jpg"],
];

const ROOM_TAGS = [
  ["ac", "bathroom", "tv", "wifi", "fridge", "kettle"],
  ["bath", "ac", "bathroom", "tv", "wifi", "fridge", "kettle"],
  ["ac", "bathroom", "tv", "wifi", "fridge", "kettle"],
  ["ac", "bathroom", "tv", "wifi", "fridge", "kettle"],
  ["ac", "bathroom", "tv", "wifi", "fridge", "kettle"],
];

interface RoomItem {
  title: string;
  price: string;
  capacity: string;
  area: string;
  beds: string;
  images: string[];
  tags: string[];
}

interface DishItem {
  name: string;
  price: string;
}

interface FaqItem {
  title: string;
  content: string;
}

export interface Translations {
  dateLocale: string;
  brandName: string;
  nav: {
    about: string;
    amenities: string;
    rooms: string;
    restaurant: string;
    gallery: string;
    reviews: string;
    location: string;
    contacts: string;
    book: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    checkin: string;
    checkout: string;
    guests: string;
    selectDate: string;
    adults: string;
    search: string;
    statsRatingValue: string;
    statsRatingLabel: string;
    statsRoomsValue: string;
    statsRoomsLabel: string;
    statsFortressValue: string;
    statsFortressLabel: string;
  };
  about: {
    subtitle: string;
    title: string;
    description: string;
  };
  amenities: {
    subtitle: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  rooms: {
    subtitle: string;
    title: string;
    tagLabels: Record<string, string>;
    items: RoomItem[];
    book: string;
  };
  restaurant: {
    subtitle: string;
    title: string;
    description: string;
    breakfast: string;
    dishes: DishItem[];
    menuBtn: string;
  };
  gallery: {
    subtitle: string;
    title: string;
  };
  reviews: {
    subtitle: string;
    title: string;
    ratingLabel: string;
    ratingValue: string;
    testimonials: { name: string; text: string; rating: number }[];
  };
  location: {
    subtitle: string;
    title: string;
    hotelLabel: string;
    hotelAddress: string;
    restaurantLabel: string;
    restaurantAddress: string;
    importantInfo: string;
    faq: FaqItem[];
  };
  footer: {
    brandDesc: string;
    navHeading: string;
    addressHeading: string;
    hotelPhoneLabel: string;
    restaurantPhoneLabel: string;
    hotelPhone: string;
    restaurantPhone: string;
    copyright: string;
  };
}

function makeRooms(data: Omit<RoomItem, "images" | "tags">[]): RoomItem[] {
  return data.map((d, i) => ({ ...d, images: ROOM_IMAGES[i], tags: ROOM_TAGS[i] }));
}

const translations: Record<Locale, Translations> = {
  UK: {
    dateLocale: "uk-UA",
    brandName: "\u0422\u0410\u0420\u0410\u0421 \u0411\u0423\u041b\u042c\u0411\u0410",
    nav: {
      about: "\u041f\u0440\u043e \u043d\u0430\u0441",
      amenities: "\u0417\u0440\u0443\u0447\u043d\u043e\u0441\u0442\u0456",
      rooms: "\u041d\u043e\u043c\u0435\u0440\u0438",
      restaurant: "\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d",
      gallery: "\u0413\u0430\u043b\u0435\u0440\u0435\u044f",
      reviews: "\u0412\u0456\u0434\u0433\u0443\u043a\u0438",
      location: "\u041b\u043e\u043a\u0430\u0446\u0456\u044f",
      contacts: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u0438",
      book: "\u0417\u0410\u0411\u0420\u041e\u041d\u042e\u0412\u0410\u0422\u0418",
    },
    hero: {
      headline: "\u0414\u0423\u0425 \u041a\u041e\u0417\u0410\u0426\u0422\u0412\u0410\n\u0423 \u0421\u0415\u0420\u0426\u0406 \u0421\u0422\u0410\u0420\u041e\u0413\u041e \u041c\u0406\u0421\u0422\u0410",
      subheadline: "\u0412\u0456\u0434\u0447\u0443\u0439\u0442\u0435 \u043d\u0435\u043f\u043e\u0432\u0442\u043e\u0440\u043d\u0443 \u0430\u0442\u043c\u043e\u0441\u0444\u0435\u0440\u0443 \u043a\u043e\u0437\u0430\u0446\u044c\u043a\u043e\u0457 \u0434\u043e\u0431\u0438, \u043f\u043e\u0454\u0434\u043d\u0430\u043d\u0443 \u0456\u0437 \u0441\u0443\u0447\u0430\u0441\u043d\u0438\u043c \u043a\u043e\u043c\u0444\u043e\u0440\u0442\u043e\u043c \u0442\u0430 \u0433\u043e\u0441\u0442\u0438\u043d\u043d\u0456\u0441\u0442\u044e, \u0443 \u0441\u0430\u043c\u043e\u043c\u0443 \u0441\u0435\u0440\u0446\u0456 \u0456\u0441\u0442\u043e\u0440\u0438\u0447\u043d\u043e\u0433\u043e \u041a\u0430\u043c\u2019\u044f\u043d\u0446\u044f-\u041f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u043e\u0433\u043e",
      checkin: "\u041f\u0440\u0438\u0457\u0437\u0434",
      checkout: "\u0412\u0438\u0457\u0437\u0434",
      guests: "\u0413\u043e\u0441\u0442\u0456",
      selectDate: "\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0434\u0430\u0442\u0443",
      adults: "\u043e\u0441\u0456\u0431",
      search: "\u041f\u0415\u0420\u0415\u0412\u0406\u0420\u0418\u0422\u0418 \u0414\u041e\u0421\u0422\u0423\u041f\u041d\u0406\u0421\u0422\u042c",
      statsRatingValue: "9,5",
      statsRatingLabel: "\u0420\u0435\u0439\u0442\u0438\u043d\u0433 / 10",
      statsRoomsValue: "48",
      statsRoomsLabel: "\u0417\u0430\u0442\u0438\u0448\u043d\u0438\u0445 \u043d\u043e\u043c\u0435\u0440\u0456\u0432",
      statsFortressValue: "5 \u0425\u0412",
      statsFortressLabel: "\u0414\u043e \u0421\u0442\u0430\u0440\u043e\u0457 \u0444\u043e\u0440\u0442\u0435\u0446\u0456",
    },
    about: {
      subtitle: "\u041f\u0420\u041e \u041a\u041e\u041c\u041f\u041b\u0415\u041a\u0421",
      title: "\u0406\u0421\u0422\u041e\u0420\u0406\u042f \u0422\u0410 \u0421\u0423\u0427\u0410\u0421\u041d\u0406\u0421\u0422\u042c \u0412 \u041e\u0414\u041d\u041e\u041c\u0423 \u041c\u0406\u0421\u0426\u0406",
      description: "\u0413\u043e\u0442\u0435\u043b\u044c\u043d\u0438\u0439 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441 \u00ab\u0422\u0430\u0440\u0430\u0441 \u0411\u0443\u043b\u044c\u0431\u0430\u00bb \u0440\u043e\u0437\u0442\u0430\u0448\u043e\u0432\u0430\u043d\u0438\u0439 \u0443 \u043d\u0430\u0439\u0433\u043e\u043b\u043e\u0432\u043d\u0456\u0448\u0456\u0439 \u0456\u0441\u0442\u043e\u0440\u0438\u0447\u043d\u0456\u0439 \u043c\u0456\u0441\u0446\u0435\u0432\u043e\u0441\u0442\u0456 \u041a\u0430\u043c\u2019\u044f\u043d\u0446\u044f-\u041f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u043e\u0433\u043e - \u0432 \u0441\u0435\u0440\u0446\u0456 \u0421\u0442\u0430\u0440\u043e\u0433\u043e \u043c\u0456\u0441\u0442\u0430. \u0413\u043e\u043b\u043e\u0432\u043d\u043e\u044e \u043e\u0441\u043e\u0431\u043b\u0438\u0432\u0456\u0441\u0442\u044e \u0437\u0430\u043a\u043b\u0430\u0434\u0443 \u0454 \u0434\u0443\u0445 \u043a\u043e\u0437\u0430\u0446\u0442\u0432\u0430: \u043a\u043e\u043d\u0446\u0435\u043f\u0446\u0456\u044f \u043f\u043e\u0432\u2019\u044f\u0437\u0430\u043d\u0430 \u0437 \u0432\u0438\u0434\u0430\u0442\u043d\u0438\u043c\u0438 \u0433\u0435\u0442\u044c\u043c\u0430\u043d\u0430\u043c\u0438 \u0423\u043a\u0440\u0430\u0457\u043d\u0438, \u0447\u0438\u0457 \u043f\u043e\u0440\u0442\u0440\u0435\u0442\u0438 \u043f\u0440\u0438\u043a\u0440\u0430\u0448\u0430\u044e\u0442\u044c \u0456\u043d\u0442\u0435\u0440\u2019\u0454\u0440\u0438 \u0442\u0430 \u043d\u0430\u0434\u0438\u0445\u0430\u044e\u0442\u044c \u0441\u0432\u043e\u0454\u044e \u0456\u0441\u0442\u043e\u0440\u0456\u0454\u044e. \u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0441 \u043d\u0430\u043b\u0456\u0447\u0443\u0454 \u0434\u0432\u0430 \u043a\u043e\u0440\u043f\u0443\u0441\u0438 (2007 \u0442\u0430 2020 \u0440\u043e\u043a\u0456\u0432) \u043d\u0430 48 \u043d\u043e\u043c\u0435\u0440\u0456\u0432, \u0441\u0443\u0447\u0430\u0441\u043d\u0438\u0439 \u043e\u0437\u0434\u043e\u0440\u043e\u0432\u0447\u0438\u0439 \u0421\u041f\u0410-\u0446\u0435\u043d\u0442\u0440, \u0430 \u0442\u0430\u043a\u043e\u0436 \u043a\u043e\u043d\u0446\u0435\u043f\u0442\u0443\u0430\u043b\u044c\u043d\u0438\u0439 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d \u0437 \u0431\u0430\u0440\u043e\u043c \u0442\u0430 \u043b\u0456\u0442\u043d\u044c\u043e\u044e \u0442\u0435\u0440\u0430\u0441\u043e\u044e, \u0434\u0435 \u043f\u043e\u0434\u0430\u044e\u0442\u044c \u0430\u0432\u0442\u0435\u043d\u0442\u0438\u0447\u043d\u0456 \u043f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u0456 \u0441\u0442\u0440\u0430\u0432\u0438.",
    },
    amenities: {
      subtitle: "\u0417\u0420\u0423\u0427\u041d\u041e\u0421\u0422\u0406",
      title: "\u0412\u0410\u0428 \u0417\u0410\u0422\u0418\u0428\u041e\u041a - \u041d\u0410\u0428 \u041f\u0420\u0406\u041e\u0420\u0418\u0422\u0415\u0422",
      items: [
        { title: "\u0421\u041f\u0410-\u0446\u0435\u043d\u0442\u0440", desc: "\u0421\u0430\u0443\u043d\u0430, \u0445\u0430\u043c\u0430\u043c, \u0442\u0440\u0430\u0434\u0438\u0446\u0456\u0439\u043d\u0430 \u043b\u0430\u0437\u043d\u044f" },
        { title: "\u0411\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u0438\u0439 Wi-Fi", desc: "\u0428\u0432\u0438\u0434\u043a\u0456\u0441\u043d\u0438\u0439 \u0456\u043d\u0442\u0435\u0440\u043d\u0435\u0442 \u043d\u0430 \u0432\u0441\u0456\u0439 \u0442\u0435\u0440\u0438\u0442\u043e\u0440\u0456\u0457" },
        { title: "\u041a\u043e\u043d\u0446\u0435\u043f\u0442\u0443\u0430\u043b\u044c\u043d\u0438\u0439 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d \u0442\u0430 \u0431\u0430\u0440", desc: "\u0410\u0432\u0442\u0435\u043d\u0442\u0438\u0447\u043d\u0430 \u043f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u0430 \u043a\u0443\u0445\u043d\u044f" },
        { title: "Pet-friendly", desc: "\u0414\u043e\u0437\u0432\u043e\u043b\u0435\u043d\u043e \u0437 \u0442\u0432\u0430\u0440\u0438\u043d\u0430\u043c\u0438" },
        { title: "\u0426\u0456\u043b\u043e\u0434\u043e\u0431\u043e\u0432\u0430 \u0441\u0442\u0456\u0439\u043a\u0430 \u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u0457", desc: "\u041a\u043e\u043c\u0444\u043e\u0440\u0442\u043d\u0438\u0439 \u0437\u0430\u0457\u0437\u0434 \u0443 \u0431\u0443\u0434\u044c-\u044f\u043a\u0438\u0439 \u0447\u0430\u0441" },
        { title: "\u0411\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u0430 \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u0430 \u043f\u0430\u0440\u043a\u043e\u0432\u043a\u0430", desc: "\u0417\u0430\u043a\u0440\u0438\u0442\u0438\u0439 \u043f\u0430\u0440\u043a\u0456\u043d\u0433 \u043d\u0430 \u0442\u0435\u0440\u0438\u0442\u043e\u0440\u0456\u0457" },
      ],
    },
    rooms: {
      subtitle: "\u0420\u041e\u0417\u041c\u0406\u0429\u0415\u041d\u041d\u042f",
      title: "\u0420\u041e\u0417\u041a\u0406\u0428 \u0423 \u041a\u041e\u0416\u041d\u0406\u0419 \u0414\u0415\u0422\u0410\u041b\u0406",
      tagLabels: { ac: "\u041a\u043e\u043d\u0434\u0438\u0446\u0456\u043e\u043d\u0435\u0440", bathroom: "\u0412\u043b\u0430\u0441\u043d\u0430 \u0432\u0430\u043d\u043d\u0430 \u043a\u0456\u043c\u043d\u0430\u0442\u0430", tv: "\u0422\u0435\u043b\u0435\u0432\u0456\u0437\u043e\u0440", wifi: "\u0411\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u0438\u0439 Wi-Fi", fridge: "\u0425\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a", kettle: "\u0427\u0430\u0439\u043d\u0438\u043a", bath: "\u0412\u0430\u043d\u043d\u0430" },
      items: makeRooms([
        { title: "\u0410\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u0438", price: "\u0412\u0456\u0434 800 \u0433\u0440\u043d/\u043d\u0456\u0447", capacity: "\u0414\u043e 4 \u0433\u043e\u0441\u0442\u0435\u0439", area: "35 \u043a\u0432.\u043c", beds: "1 \u0432\u0435\u043b\u0438\u043a\u0435 \u0434\u0432\u043e\u0441\u043f\u0430\u043b\u044c\u043d\u0435 \u043b\u0456\u0436\u043a\u043e + 1 \u0434\u0438\u0432\u0430\u043d-\u043b\u0456\u0436\u043a\u043e" },
        { title: "\u0421\u0442\u0443\u0434\u0456\u0439\u043d\u0456 \u0430\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442\u0438", price: "\u0412\u0456\u0434 1200 \u0433\u0440\u043d/\u043d\u0456\u0447", capacity: "\u0414\u043e 4 \u0433\u043e\u0441\u0442\u0435\u0439", area: "50 \u043a\u0432.\u043c", beds: "1 \u0434\u0443\u0436\u0435 \u0432\u0435\u043b\u0438\u043a\u0435 \u0434\u0432\u043e\u0441\u043f\u0430\u043b\u044c\u043d\u0435 \u043b\u0456\u0436\u043a\u043e + 1 \u0434\u0438\u0432\u0430\u043d-\u043b\u0456\u0436\u043a\u043e" },
        { title: "\u0421\u0456\u043c\u0435\u0439\u043d\u0438\u0439 \u043b\u044e\u043a\u0441", price: "\u0412\u0456\u0434 1000 \u0433\u0440\u043d/\u043d\u0456\u0447", capacity: "\u0414\u043e 4 \u0433\u043e\u0441\u0442\u0435\u0439", area: "35 \u043a\u0432.\u043c", beds: "1 \u0432\u0435\u043b\u0438\u043a\u0435 \u0434\u0432\u043e\u0441\u043f\u0430\u043b\u044c\u043d\u0435 \u043b\u0456\u0436\u043a\u043e + 1 \u0434\u0438\u0432\u0430\u043d-\u043b\u0456\u0436\u043a\u043e" },
        { title: "\u0421\u0456\u043c\u0435\u0439\u043d\u0438\u0439 \u043d\u043e\u043c\u0435\u0440 \u0437 \u0434\u0443\u0448\u0435\u043c", price: "\u0412\u0456\u0434 950 \u0433\u0440\u043d/\u043d\u0456\u0447", capacity: "\u0414\u043e 4 \u0433\u043e\u0441\u0442\u0435\u0439", area: "35 \u043a\u0432.\u043c", beds: "1 \u0434\u0432\u043e\u0441\u043f\u0430\u043b\u044c\u043d\u0435 \u043b\u0456\u0436\u043a\u043e + 1 \u0434\u0438\u0432\u0430\u043d-\u043b\u0456\u0436\u043a\u043e" },
        { title: "\u041f\u043e\u043a\u0440\u0430\u0449\u0435\u043d\u0438\u0439 \u043d\u043e\u043c\u0435\u0440 \u0437 \u043e\u043a\u0440\u0435\u043c\u0438\u043c\u0438 \u043b\u0456\u0436\u043a\u0430\u043c\u0438", price: "\u0412\u0456\u0434 850 \u0433\u0440\u043d/\u043d\u0456\u0447", capacity: "2 \u0433\u043e\u0441\u0442\u0456", area: "20 \u043a\u0432.\u043c", beds: "2 \u043e\u043a\u0440\u0435\u043c\u0456 \u043e\u0434\u043d\u043e\u0441\u043f\u0430\u043b\u044c\u043d\u0456 \u043b\u0456\u0436\u043a\u0430" },
      ]),
      book: "\u0417\u0410\u0411\u0420\u041e\u041d\u042e\u0412\u0410\u0422\u0418",
    },
    restaurant: {
      subtitle: "\u0413\u0410\u0421\u0422\u0420\u041e\u041d\u041e\u041c\u0406\u042f",
      title: "\u041c\u0415\u041d\u042e \u041d\u0415\u0421\u041a\u041e\u0420\u0415\u041d\u0418\u0425",
      description: "\u0412\u0456\u0434\u0447\u0443\u0439\u0442\u0435 \u0430\u0432\u0442\u0435\u043d\u0442\u0438\u0447\u043d\u0443 \u043f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u0443 \u043a\u0443\u0445\u043d\u044e \u0443 \u043d\u0430\u0448\u043e\u043c\u0443 \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u0456 \u043d\u0430 \u0432\u0443\u043b. \u0424\u0440\u0430\u043d\u0446\u0438\u0441\u043a\u0430\u043d\u0441\u044c\u043a\u0456\u0439, 10. \u0421\u0442\u0440\u0430\u0432\u0438, \u0449\u043e \u043d\u0430\u0434\u0438\u0445\u0430\u044e\u0442\u044c \u0456\u0441\u0442\u043e\u0440\u0456\u0454\u044e.",
      breakfast: "\u0421\u043d\u0456\u0434\u0430\u043d\u043a\u0438 \u0434\u043b\u044f \u0433\u043e\u0441\u0442\u0435\u0439: \u0421\u0438\u0442\u043d\u0438\u0439 \u00ab\u0421\u043d\u0456\u0434\u0430\u043d\u043e\u043a \u0434\u043b\u044f \u0441\u043f\u0440\u0430\u0432\u0436\u043d\u0456\u0445 \u043a\u043e\u0437\u0430\u043a\u0456\u0432\u00bb \u0442\u0430 \u0456\u043d\u0448\u0456 \u0440\u0430\u043d\u043a\u043e\u0432\u0456 \u0441\u0442\u0440\u0430\u0432\u0438.",
      dishes: [
        { name: "\u0414\u0435\u0440\u0443\u043d \u0437 \u0448\u043e\u0432\u0434\u0430\u0440\u0435\u043c", price: "260 \u0433\u0440\u043d" },
        { name: "\u0411\u043e\u0433\u0440\u0430\u0447 \u0443 \u0436\u0438\u0442\u043d\u0456\u0439 \u0445\u043b\u0456\u0431\u0438\u043d\u0456", price: "230 \u0433\u0440\u043d" },
        { name: "\u0412\u0430\u0440\u0435\u043d\u0438\u043a\u0438 \u0437 \u0440\u0430\u043a\u0430\u043c\u0438", price: "260 \u0433\u0440\u043d" },
        { name: "\u041f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u0438\u0439 \u0441\u0438\u0440\u043d\u0438\u043a \u0437 \u0433\u0440\u0443\u0448\u0435\u044e", price: "170 \u0433\u0440\u043d" },
      ],
      menuBtn: "\u041f\u0415\u0420\u0415\u0413\u041b\u042f\u041d\u0423\u0422\u0418 \u041f\u041e\u0412\u041d\u0415 \u041c\u0415\u041d\u042e",
    },
    gallery: {
      subtitle: "\u0413\u0410\u041b\u0415\u0420\u0415\u042f",
      title: "\u0410\u0422\u041c\u041e\u0421\u0424\u0415\u0420\u0410 \u041a\u041e\u041c\u041f\u041b\u0415\u041a\u0421\u0423",
    },
    reviews: {
      subtitle: "\u0412\u0406\u0414\u0413\u0423\u041a\u0418",
      title: "\u0429\u041e \u041a\u0410\u0416\u0423\u0422\u042c \u041d\u0410\u0428\u0406 \u0413\u041e\u0421\u0422\u0406",
      ratingLabel: "\u0412\u0438\u043d\u044f\u0442\u043a\u043e\u0432\u0438\u0439",
      ratingValue: "9.5",
      testimonials: [
        { name: "\u041e\u043b\u044c\u0433\u0430", text: "\u0413\u0430\u0440\u043d\u0430 \u043b\u043e\u043a\u0430\u0446\u0456\u044f, \u0447\u0438\u0441\u0442\u043e, \u0442\u0435\u0440\u0438\u0442\u043e\u0440\u0456\u044f \u0434\u043e\u0433\u043b\u044f\u043d\u0443\u0442\u0430 \u0439 \u0430\u043a\u0443\u0440\u0430\u0442\u043d\u0430, \u0430\u0434\u043c\u0456\u043d\u0456\u0441\u0442\u0440\u0430\u0446\u0456\u044f \u043f\u0440\u0438\u0432\u0456\u0442\u043d\u0430 \u0442\u0430 \u0443\u0432\u0430\u0436\u043d\u0430.", rating: 10 },
        { name: "\u0410\u043d\u043d\u0430", text: "\u041f\u0440\u0438\u0454\u043c\u043d\u0438\u0439 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b, \u0447\u0438\u0441\u0442\u0456 \u0442\u0430 \u0442\u0435\u043f\u043b\u0456 \u043d\u043e\u043c\u0435\u0440\u0430. \u0422\u0438\u0445\u0430 \u0432\u0443\u043b\u0438\u0446\u044f, \u0431\u043b\u0438\u0437\u044c\u043a\u043e \u0434\u043e \u0444\u043e\u0440\u0442\u0435\u0446\u0456.", rating: 10 },
        { name: "\u041a\u0441\u0435\u043d\u0456\u044f", text: "\u0411\u0443\u043b\u0438 \u043f\u0440\u043e\u0457\u0437\u0434\u043e\u043c, \u0430 \u0432 \u0434\u043e\u0440\u043e\u0437\u0456 \u0433\u043e\u043b\u043e\u0432\u043d\u0435 \u0432\u0438\u0441\u043f\u0430\u0442\u0438\u0441\u044c. \u041f\u043e\u0441\u0442\u0456\u043b\u044c, \u043e\u0434\u0456\u044f\u043b\u043e, \u043f\u043e\u0434\u0443\u0448\u043a\u0438, \u0430 \u0433\u043e\u043b\u043e\u0432\u043d\u0435 \u043c\u0430\u0442\u0440\u0430\u0441 - \u043d\u0430 5+. \u0414\u0443\u0436\u0435 \u0434\u044f\u043a\u0443\u0454\u043c\u043e \u0437\u0430 \u0433\u043e\u0441\u0442\u0438\u043d\u043d\u0456\u0441\u0442\u044c, \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u044e.", rating: 10 },
        { name: "\u041e\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440", text: "\u0426\u0456\u043b\u043a\u043e\u043c \u043f\u0440\u0438\u0441\u0442\u043e\u0439\u043d\u0435 \u043c\u0456\u0441\u0446\u0435. \u0414\u043e \u0421\u0442\u0430\u0440\u043e\u0433\u043e \u043c\u0456\u0441\u0442\u0430 15 \u0445\u0432\u0438\u043b\u0438\u043d \u043d\u0435\u0441\u043f\u0456\u0448\u043d\u043e\u0457 \u043f\u0440\u043e\u0433\u0443\u043b\u044f\u043d\u043a\u0438. \u0404 \u043f\u0430\u0440\u043a\u043e\u0432\u043a\u0430, \u0432\u0430\u0439\u0444\u0430\u0439. \u0421\u0438\u043c\u043f\u0430\u0442\u0438\u0447\u043d\u0438\u0439 \u0432\u043d\u0443\u0442\u0440\u0456\u0448\u043d\u0456\u0439 \u0434\u0432\u0456\u0440. \u041f\u0440\u043e\u0441\u0442\u043e\u0440\u0456 \u043d\u043e\u043c\u0435\u0440\u0438 \u0437 \u0445\u043e\u043b\u043e\u0434\u0438\u043b\u044c\u043d\u0438\u043a\u043e\u043c. \u0427\u0438\u0441\u0442\u043e.", rating: 9 },
        { name: "\u0422\u0435\u0442\u044f\u043d\u0430", text: "\u041d\u043e\u043c\u0435\u0440\u0438 \u0447\u0438\u0441\u0442\u0456, \u0437\u0430\u0442\u0438\u0448\u043d\u0456. \u0411\u0456\u043b\u0438\u0437\u043d\u0430 \u0431\u0456\u043b\u043e\u0441\u043d\u0456\u0436\u043d\u0430. \u0412\u0440\u0430\u0436\u0435\u043d\u043d\u044f \u043f\u0440\u0438\u0454\u043c\u043d\u0456.", rating: 10 },
        { name: "\u0422\u0435\u0442\u044f\u043d\u0430", text: "\u0412\u0441\u0435 \u0447\u0438\u0441\u0442\u043e \u0442\u0430 \u0430\u043a\u0443\u0440\u0430\u0442\u043d\u043e. \u0414\u0443\u0436\u0435 \u043f\u0440\u0438\u0454\u043c\u043d\u0430 \u0430\u0434\u043c\u0456\u043d\u0456\u0441\u0442\u0440\u0430\u0442\u043e\u0440. \u0427\u0443\u0434\u043e\u0432\u0438\u0439, \u043a\u043e\u0440\u0438\u0441\u043d\u0438\u0439 \u0441\u043d\u0456\u0434\u0430\u043d\u043e\u043a, \u0433\u0430\u0440\u043d\u0430 \u0441\u0435\u0440\u0432\u0456\u0440\u043e\u0432\u043a\u0430.", rating: 10 },
        { name: "\u041e\u043b\u044c\u0433\u0430", text: "\u041d\u043e\u043c\u0435\u0440\u0438 \u0447\u0443\u0434\u043e\u0432\u0456, \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u043b - \u043f\u0440\u0435\u043a\u0440\u0430\u0441\u043d\u0438\u0439, \u0440\u043e\u0437\u0442\u0430\u0448\u0443\u0432\u0430\u043d\u043d\u044f \u0434\u0443\u0436\u0435 \u0437\u0440\u0443\u0447\u043d\u0435! \u0414\u0456\u0442\u0438 \u0432 \u0437\u0430\u0445\u0432\u0430\u0442\u0456 \u0456 \u0445\u043e\u0447\u0443\u0442\u044c \u043f\u0440\u0438\u0457\u0445\u0430\u0442\u0438 \u0449\u0435.", rating: 10 },
        { name: "\u0410\u043d\u0430\u0441\u0442\u0430\u0441\u0456\u044f", text: "\u0417\u0440\u0443\u0447\u043d\u0435 \u0440\u043e\u0437\u0442\u0430\u0448\u0443\u0432\u0430\u043d\u043d\u044f, \u0432 \u043d\u043e\u043c\u0435\u0440\u0456 \u0431\u0443\u0432 \u043a\u043e\u043d\u0434\u0438\u0446\u0456\u043e\u043d\u0435\u0440, \u0434\u043e\u0432\u043e\u043b\u0456 \u0447\u0438\u0441\u0442\u043e. \u0414\u043b\u044f \u043a\u043e\u0440\u043e\u0442\u043a\u043e\u0433\u043e \u043f\u0435\u0440\u0435\u0431\u0443\u0432\u0430\u043d\u043d\u044f, \u0433\u043e\u0442\u0435\u043b\u044c \u0445\u043e\u0440\u043e\u0448\u0438\u0439.", rating: 9 },
      ],
    },
    location: {
      subtitle: "\u041b\u041e\u041a\u0410\u0426\u0406\u042f \u0422\u0410 \u0412\u0410\u0416\u041b\u0418\u0412\u0410 \u0406\u041d\u0424\u041e\u0420\u041c\u0410\u0426\u0406\u042f",
      title: "\u042f\u041a \u041d\u0410\u0421 \u0417\u041d\u0410\u0419\u0422\u0418 \u0422\u0410 \u0429\u041e \u041f\u041e\u0422\u0420\u0406\u0411\u041d\u041e \u0417\u041d\u0410\u0422\u0418",
      hotelLabel: "\u0413\u043e\u0442\u0435\u043b\u044c",
      hotelAddress: "\u0432\u0443\u043b. \u0424\u0440\u0430\u043d\u0446\u0438\u0441\u043a\u0430\u043d\u0441\u044c\u043a\u0430, 10, \u041a\u0430\u043c\u2019\u044f\u043d\u0435\u0446\u044c-\u041f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u0438\u0439, \u0425\u043c\u0435\u043b\u044c\u043d\u0438\u0446\u044c\u043a\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c, 32301",
      restaurantLabel: "\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d",
      restaurantAddress: "\u0432\u0443\u043b. \u0424\u0440\u0430\u043d\u0446\u0438\u0441\u043a\u0430\u043d\u0441\u044c\u043a\u0430, 10, \u041a\u0430\u043c\u2019\u044f\u043d\u0435\u0446\u044c-\u041f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u0438\u0439, \u0425\u043c\u0435\u043b\u044c\u043d\u0438\u0446\u044c\u043a\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c, 32301",
      importantInfo: "\u0412\u0430\u0436\u043b\u0438\u0432\u0430 \u0456\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u044f",
      faq: [
        { title: "\u041f\u0430\u0440\u043a\u0443\u0432\u0430\u043d\u043d\u044f", content: "\u041d\u0430 \u0442\u0435\u0440\u0438\u0442\u043e\u0440\u0456\u0457 \u0430\u0431\u043e \u043f\u043e\u0440\u0443\u0447 \u0456\u0437 \u0433\u043e\u0442\u0435\u043b\u0435\u043c \u0454 \u0431\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u0430 \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u0430 \u043f\u0430\u0440\u043a\u043e\u0432\u043a\u0430 \u0434\u043b\u044f \u0433\u043e\u0441\u0442\u0435\u0439. \u041a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c \u043c\u0456\u0441\u0446\u044c \u043c\u043e\u0436\u0435 \u0431\u0443\u0442\u0438 \u043e\u0431\u043c\u0435\u0436\u0435\u043d\u043e\u044e \u043f\u0456\u0434 \u0447\u0430\u0441 \u0432\u0438\u0441\u043e\u043a\u043e\u0433\u043e \u0441\u0435\u0437\u043e\u043d\u0443." },
        { title: "\u0427\u0430\u0441 \u0437\u0430\u0457\u0437\u0434\u0443 \u0442\u0430 \u0432\u0438\u0457\u0437\u0434\u0443", content: "\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044f \u0437\u0430\u0457\u0437\u0434\u0443 \u0437\u0434\u0456\u0439\u0441\u043d\u044e\u0454\u0442\u044c\u0441\u044f \u0437 14:00, \u0430 \u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044f \u0432\u0438\u0457\u0437\u0434\u0443 - \u0434\u043e 12:00." },
        { title: "\u041f\u0440\u0430\u0432\u0438\u043b\u0430 \u0440\u043e\u0437\u043c\u0456\u0449\u0435\u043d\u043d\u044f", content: "\u041e\u043f\u043b\u0430\u0442\u0430 \u0437\u0430 \u043f\u0440\u043e\u0436\u0438\u0432\u0430\u043d\u043d\u044f \u0442\u0430 \u043f\u043e\u0441\u043b\u0443\u0433\u0438 \u0437\u0434\u0456\u0439\u0441\u043d\u044e\u0454\u0442\u044c\u0441\u044f \u0432\u0438\u043a\u043b\u044e\u0447\u043d\u043e \u0433\u043e\u0442\u0456\u0432\u043a\u043e\u044e (\u0442\u0435\u0440\u043c\u0456\u043d\u0430\u043b\u0443 \u043d\u0435\u043c\u0430\u0454). \u041f\u0440\u043e\u0441\u0438\u043c\u043e \u0432\u0440\u0430\u0445\u0443\u0432\u0430\u0442\u0438 \u0446\u0435 \u043f\u0440\u0438 \u043f\u043b\u0430\u043d\u0443\u0432\u0430\u043d\u043d\u0456 \u043f\u043e\u0434\u043e\u0440\u043e\u0436\u0456. \u0421\u0456\u043c\u0435\u0439\u043d\u0456 \u043d\u043e\u043c\u0435\u0440\u0438 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0456, \u0440\u043e\u0437\u043c\u0456\u0449\u0435\u043d\u043d\u044f \u0437 \u0434\u0456\u0442\u044c\u043c\u0438 \u0432\u0456\u0442\u0430\u0454\u0442\u044c\u0441\u044f. \u041f\u0440\u0438 \u0437\u0430\u0457\u0437\u0434\u0456 \u043c\u043e\u0436\u0435 \u0441\u0442\u044f\u0433\u0443\u0432\u0430\u0442\u0438\u0441\u044f \u0433\u043e\u0442\u0456\u0432\u043a\u043e\u0432\u0430 \u0437\u0430\u0441\u0442\u0430\u0432\u0430 \u0443 \u0440\u043e\u0437\u043c\u0456\u0440\u0456 400 \u0433\u0440\u043d, \u044f\u043a\u0430 \u043f\u043e\u0432\u0435\u0440\u0442\u0430\u0454\u0442\u044c\u0441\u044f \u043f\u0456\u0434 \u0447\u0430\u0441 \u0432\u0438\u0457\u0437\u0434\u0443." },
        { title: "\u041f\u0438\u0442\u043d\u0430 \u0432\u043e\u0434\u0430 \u0432 \u043d\u043e\u043c\u0435\u0440\u0430\u0445", content: "\u0423 \u043a\u043e\u0436\u043d\u043e\u043c\u0443 \u043d\u043e\u043c\u0435\u0440\u0456 \u0434\u043b\u044f \u0432\u0430\u0448\u043e\u0457 \u0437\u0440\u0443\u0447\u043d\u043e\u0441\u0442\u0456 \u043d\u0430\u0434\u0430\u0454\u0442\u044c\u0441\u044f \u0435\u043b\u0435\u043a\u0442\u0440\u0438\u0447\u043d\u0438\u0439 \u0447\u0430\u0439\u043d\u0438\u043a \u0442\u0430 \u0431\u0430\u0437\u043e\u0432\u0438\u0439 \u043d\u0430\u0431\u0456\u0440 \u043f\u043e\u0441\u0443\u0434\u0443." },
        { title: "\u041f\u043e\u0441\u043b\u0443\u0433\u0430 \u0440\u0430\u043d\u043d\u044c\u043e\u0433\u043e \u0437\u0430\u0457\u0437\u0434\u0443", content: "\u0420\u0430\u043d\u043d\u0456\u0439 \u0437\u0430\u0457\u0437\u0434 \u0430\u0431\u043e \u043f\u0456\u0437\u043d\u0456\u0439 \u0432\u0438\u0457\u0437\u0434 \u043c\u043e\u0436\u043b\u0438\u0432\u0456 \u0437\u0430 \u043f\u043e\u043f\u0435\u0440\u0435\u0434\u043d\u0456\u043c \u0437\u0430\u043f\u0438\u0442\u043e\u043c, \u0437\u0430\u043b\u0435\u0436\u043d\u043e \u0432\u0456\u0434 \u043d\u0430\u044f\u0432\u043d\u043e\u0441\u0442\u0456 \u0432\u0456\u043b\u044c\u043d\u0438\u0445 \u043d\u043e\u043c\u0435\u0440\u0456\u0432, \u0456 \u043c\u043e\u0436\u0443\u0442\u044c \u043f\u043e\u0442\u0440\u0435\u0431\u0443\u0432\u0430\u0442\u0438 \u0434\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u043e\u0457 \u043e\u043f\u043b\u0430\u0442\u0438." },
        { title: "\u041f\u0440\u043e\u0436\u0438\u0432\u0430\u043d\u043d\u044f \u0437 \u0434\u043e\u043c\u0430\u0448\u043d\u0456\u043c\u0438 \u0442\u0432\u0430\u0440\u0438\u043d\u0430\u043c\u0438 (Pet-friendly)", content: "\u041d\u0430\u0448 \u0433\u043e\u0442\u0435\u043b\u044c \u0440\u0430\u0434\u043e \u043f\u0440\u0438\u0439\u043c\u0430\u0454 \u0433\u043e\u0441\u0442\u0435\u0439 \u0456\u0437 \u0434\u043e\u043c\u0430\u0448\u043d\u0456\u043c\u0438 \u0443\u043b\u044e\u0431\u043b\u0435\u043d\u0446\u044f\u043c\u0438. \u041f\u0440\u043e\u0436\u0438\u0432\u0430\u043d\u043d\u044f \u0437 \u0442\u0432\u0430\u0440\u0438\u043d\u0430\u043c\u0438 \u0434\u043e\u0437\u0432\u043e\u043b\u044f\u0454\u0442\u044c\u0441\u044f \u0437\u0430 \u043f\u043e\u043f\u0435\u0440\u0435\u0434\u043d\u0456\u043c \u0437\u0430\u043f\u0438\u0442\u043e\u043c. \u0417\u0432\u0435\u0440\u043d\u0456\u0442\u044c \u0443\u0432\u0430\u0433\u0443, \u0449\u043e \u0437\u0430 \u0446\u044e \u043f\u043e\u0441\u043b\u0443\u0433\u0443 \u043c\u043e\u0436\u0435 \u0441\u0442\u044f\u0433\u0443\u0432\u0430\u0442\u0438\u0441\u044f \u043f\u043e\u043c\u0456\u0440\u043d\u0430 \u0434\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0430 \u043f\u043b\u0430\u0442\u0430, \u0442\u043e\u043c\u0443 \u043f\u0440\u043e\u0441\u0438\u043c\u043e \u043f\u043e\u043f\u0435\u0440\u0435\u0434\u0438\u0442\u0438 \u043d\u0430\u0441 \u043f\u0440\u043e \u0432\u0430\u0448\u043e\u0433\u043e \u0443\u043b\u044e\u0431\u043b\u0435\u043d\u0446\u044f \u043f\u0456\u0434 \u0447\u0430\u0441 \u0431\u0440\u043e\u043d\u044e\u0432\u0430\u043d\u043d\u044f." },
      ],
    },
    footer: {
      brandDesc: "\u0413\u043e\u0442\u0435\u043b\u044c\u043d\u0438\u0439 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441 \u0443 \u0441\u0435\u0440\u0446\u0456 \u0456\u0441\u0442\u043e\u0440\u0438\u0447\u043d\u043e\u0433\u043e \u041a\u0430\u043c\u2019\u044f\u043d\u0446\u044f-\u041f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u043e\u0433\u043e. \u0414\u0443\u0445 \u043a\u043e\u0437\u0430\u0446\u0442\u0432\u0430 \u0442\u0430 \u0441\u0443\u0447\u0430\u0441\u043d\u0438\u0439 \u043a\u043e\u043c\u0444\u043e\u0440\u0442.",
      navHeading: "\u041d\u0410\u0412\u0406\u0413\u0410\u0426\u0406\u042f",
      addressHeading: "\u041a\u041e\u041d\u0422\u0410\u041a\u0422\u0418",
      hotelPhoneLabel: "\u0413\u043e\u0442\u0435\u043b\u044c",
      restaurantPhoneLabel: "\u0420\u0435\u0441\u0442\u043e\u0440\u0430\u043d",
      hotelPhone: "+380673811554",
      restaurantPhone: "+380677677340",
      copyright: "\u00a9 2026 \u0422\u0430\u0440\u0430\u0441 \u0411\u0443\u043b\u044c\u0431\u0430. \u0423\u0441\u0456 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0445\u0438\u0449\u0435\u043d\u0456.",
    },
  },
  EN: {
    dateLocale: "en-GB",
    brandName: "TARAS BULBA",
    nav: { about: "About", amenities: "Amenities", rooms: "Rooms", restaurant: "Restaurant", gallery: "Gallery", reviews: "Reviews", location: "Location", contacts: "Contacts", book: "BOOK NOW" },
    hero: {
      headline: "COSSACK SPIRIT\nIN THE HEART OF THE OLD TOWN",
      subheadline: "Experience the unique atmosphere of the Cossack era combined with modern comfort and hospitality in the heart of historic Kamianets-Podilskyi",
      checkin: "Check-in", checkout: "Check-out", guests: "Guests", selectDate: "Select date", adults: "guests", search: "CHECK AVAILABILITY",
      statsRatingValue: "9.5", statsRatingLabel: "Rating / 10", statsRoomsValue: "48", statsRoomsLabel: "Cozy rooms", statsFortressValue: "5 MIN", statsFortressLabel: "To the Old Fortress",
    },
    about: {
      subtitle: "ABOUT THE COMPLEX",
      title: "HISTORY AND MODERNITY IN ONE PLACE",
      description: "The Taras Bulba hotel complex is located in the most significant historic area of Kamianets-Podilskyi - in the heart of the Old Town. The main feature of the establishment is the spirit of the Cossacks: the concept is connected with the outstanding hetmans of Ukraine, whose portraits adorn the interiors and inspire with their history. The complex comprises two buildings (2007 and 2020) with 48 rooms, a modern wellness SPA center, and a concept restaurant with a bar and summer terrace serving authentic Podolian cuisine.",
    },
    amenities: {
      subtitle: "AMENITIES", title: "YOUR COMFORT - OUR PRIORITY",
      items: [
        { title: "SPA Center", desc: "Sauna, hammam, traditional bathhouse" },
        { title: "Free Wi-Fi", desc: "High-speed internet throughout the property" },
        { title: "Concept Restaurant & Bar", desc: "Authentic Podolian cuisine" },
        { title: "Pet-friendly", desc: "Pets are welcome" },
        { title: "24-hour Reception", desc: "Comfortable check-in at any time" },
        { title: "Free Private Parking", desc: "Enclosed parking on-site" },
      ],
    },
    rooms: {
      subtitle: "ACCOMMODATION", title: "LUXURY IN EVERY DETAIL",
      tagLabels: { ac: "Air Conditioning", bathroom: "Private Bathroom", tv: "TV", wifi: "Free Wi-Fi", fridge: "Refrigerator", kettle: "Kettle", bath: "Bathtub" },
      items: makeRooms([
        { title: "Apartments", price: "From 800 UAH/night", capacity: "Up to 4 guests", area: "35 m\u00b2", beds: "1 large double bed + 1 sofa bed" },
        { title: "Studio Apartments", price: "From 1200 UAH/night", capacity: "Up to 4 guests", area: "50 m\u00b2", beds: "1 extra large double bed + 1 sofa bed" },
        { title: "Family Suite", price: "From 1000 UAH/night", capacity: "Up to 4 guests", area: "35 m\u00b2", beds: "1 large double bed + 1 sofa bed" },
        { title: "Family Room with Shower", price: "From 950 UAH/night", capacity: "Up to 4 guests", area: "35 m\u00b2", beds: "1 double bed + 1 sofa bed" },
        { title: "Superior Twin Room", price: "From 850 UAH/night", capacity: "2 guests", area: "20 m\u00b2", beds: "2 single beds" },
      ]),
      book: "BOOK NOW",
    },
    restaurant: {
      subtitle: "GASTRONOMY", title: "MENU OF THE UNCONQUERED",
      description: "Experience authentic Podolian cuisine at our restaurant at 10 Frantsyskanska St. Dishes inspired by history.",
      breakfast: "Guest breakfasts: Hearty \"Cossack Breakfast\" and other morning dishes.",
      dishes: [
        { name: "Derun with ham", price: "260 UAH" },
        { name: "Bograch in rye bread", price: "230 UAH" },
        { name: "Varenyky with crayfish", price: "260 UAH" },
        { name: "Podolian cheesecake with pear", price: "170 UAH" },
      ],
      menuBtn: "VIEW FULL MENU",
    },
    gallery: { subtitle: "GALLERY", title: "ATMOSPHERE OF THE COMPLEX" },
    reviews: {
      subtitle: "REVIEWS", title: "WHAT OUR GUESTS SAY", ratingLabel: "Exceptional", ratingValue: "9.5",
      testimonials: [
        { name: "Olha", text: "Good location, clean, the territory is well-kept and neat, the administration is friendly and attentive.", rating: 10 },
        { name: "Anna", text: "Pleasant staff, clean and warm rooms. Quiet street, close to the fortress.", rating: 10 },
        { name: "Kseniia", text: "We were passing through, and the main thing on the road is to get some sleep. The bed, blanket, pillows, and especially the mattress - 5+. Thank you for your hospitality, I recommend it.", rating: 10 },
        { name: "Oleksandr", text: "Quite a decent place. It is a 15-minute leisurely walk to the Old Town. There is parking, Wi-Fi. A nice courtyard. Spacious rooms with a refrigerator. Clean.", rating: 9 },
        { name: "Tetiana", text: "The rooms are clean and cozy. The linen is snow-white. Pleasant impressions.", rating: 10 },
        { name: "Tetiana", text: "Everything is clean and neat. A very pleasant administrator. Great, healthy breakfast, nice table setting.", rating: 10 },
        { name: "Olha", text: "The rooms are wonderful, the staff is excellent, the location is very convenient! The children are delighted and want to come again.", rating: 10 },
        { name: "Anastasiia", text: "Convenient location, there was air conditioning in the room, quite clean. For a short stay, the hotel is good.", rating: 9 },
      ],
    },
    location: {
      subtitle: "LOCATION & IMPORTANT INFORMATION", title: "HOW TO FIND US & WHAT YOU NEED TO KNOW",
      hotelLabel: "Hotel", hotelAddress: "10 Frantsyskanska St., Kamianets-Podilskyi, Khmelnytskyi Oblast, 32301",
      restaurantLabel: "Restaurant", restaurantAddress: "10 Frantsyskanska St., Kamianets-Podilskyi, Khmelnytskyi Oblast, 32301",
      importantInfo: "Important information",
      faq: [
        { title: "Parking", content: "Free private parking is available on-site or near the hotel for guests. The number of spaces may be limited during high season." },
        { title: "Check-in and Check-out", content: "Check-in is from 14:00, check-out is until 12:00." },
        { title: "Accommodation rules", content: "Payment for accommodation and services is made exclusively in cash (no card terminal available). Please take this into account when planning your trip. Family rooms are available, children are welcome. A cash deposit of 400 UAH may be charged upon check-in, which is refunded at check-out." },
        { title: "Drinking water in rooms", content: "Each room is equipped with an electric kettle and a basic set of tableware for your convenience." },
        { title: "Early check-in service", content: "Early check-in or late check-out is possible upon prior request, subject to availability, and may require an additional charge." },
        { title: "Pet-friendly accommodation", content: "Our hotel warmly welcomes guests with pets. Accommodation with animals is allowed upon prior request. Please note that a moderate additional charge may apply, so please inform us about your pet when booking." },
      ],
    },
    footer: {
      brandDesc: "Hotel complex in the heart of historic Kamianets-Podilskyi. Cossack spirit and modern comfort.",
      navHeading: "NAVIGATION", addressHeading: "CONTACTS",
      hotelPhoneLabel: "Hotel", restaurantPhoneLabel: "Restaurant",
      hotelPhone: "+380673811554", restaurantPhone: "+380677677340",
      copyright: "\u00a9 2026 Taras Bulba. All rights reserved.",
    },
  },
  DE: {
    dateLocale: "de-DE",
    brandName: "TARAS BULBA",
    nav: { about: "\u00dcber uns", amenities: "Ausstattung", rooms: "Zimmer", restaurant: "Restaurant", gallery: "Galerie", reviews: "Bewertungen", location: "Standort", contacts: "Kontakt", book: "BUCHEN" },
    hero: {
      headline: "KOSAKENGEIST\nIM HERZEN DER ALTSTADT",
      subheadline: "Erleben Sie die einzigartige Atmosph\u00e4re der Kosakenzeit verbunden mit modernem Komfort und Gastfreundschaft im Herzen des historischen Kamjanez-Podilskyj",
      checkin: "Anreise", checkout: "Abreise", guests: "G\u00e4ste", selectDate: "Datum w\u00e4hlen", adults: "G\u00e4ste", search: "VERF\u00dcGBARKEIT PR\u00dcFEN",
      statsRatingValue: "9,5", statsRatingLabel: "Bewertung / 10", statsRoomsValue: "48", statsRoomsLabel: "Gem\u00fctliche Zimmer", statsFortressValue: "5 MIN", statsFortressLabel: "Zur alten Festung",
    },
    about: {
      subtitle: "\u00dcBER DEN KOMPLEX", title: "GESCHICHTE UND MODERNE AN EINEM ORT",
      description: "Der Hotelkomplex Taras Bulba befindet sich im bedeutendsten historischen Gebiet von Kamjanez-Podilskyj - im Herzen der Altstadt. Das Hauptmerkmal ist der Geist der Kosaken: Das Konzept ist mit den herausragenden Hetmanen der Ukraine verbunden, deren Portr\u00e4ts die Innenr\u00e4ume schm\u00fccken und mit ihrer Geschichte inspirieren. Der Komplex umfasst zwei Geb\u00e4ude (2007 und 2020) mit 48 Zimmern, ein modernes Wellness-SPA-Zentrum sowie ein Konzeptrestaurant mit Bar und Sommerterrasse, in dem authentische podolische K\u00fcche serviert wird.",
    },
    amenities: {
      subtitle: "AUSSTATTUNG", title: "IHR KOMFORT - UNSERE PRIORIT\u00c4T",
      items: [
        { title: "SPA-Zentrum", desc: "Sauna, Hammam, traditionelles Badehaus" },
        { title: "Kostenloses WLAN", desc: "Highspeed-Internet im gesamten Geb\u00e4ude" },
        { title: "Konzeptrestaurant & Bar", desc: "Authentische podolische K\u00fcche" },
        { title: "Haustierfreundlich", desc: "Haustiere sind willkommen" },
        { title: "24-Stunden-Rezeption", desc: "Komfortabler Check-in jederzeit" },
        { title: "Kostenloser Privatparkplatz", desc: "Geschlossener Parkplatz vor Ort" },
      ],
    },
    rooms: {
      subtitle: "UNTERKUNFT", title: "LUXUS IN JEDEM DETAIL",
      tagLabels: { ac: "Klimaanlage", bathroom: "Eigenes Bad", tv: "Fernseher", wifi: "Kostenloses WLAN", fridge: "K\u00fchlschrank", kettle: "Wasserkocher", bath: "Badewanne" },
      items: makeRooms([
        { title: "Appartements", price: "Ab 800 UAH/Nacht", capacity: "Bis zu 4 G\u00e4ste", area: "35 m\u00b2", beds: "1 gro\u00dfes Doppelbett + 1 Schlafsofa" },
        { title: "Studio-Appartements", price: "Ab 1200 UAH/Nacht", capacity: "Bis zu 4 G\u00e4ste", area: "50 m\u00b2", beds: "1 extra gro\u00dfes Doppelbett + 1 Schlafsofa" },
        { title: "Familiensuite", price: "Ab 1000 UAH/Nacht", capacity: "Bis zu 4 G\u00e4ste", area: "35 m\u00b2", beds: "1 gro\u00dfes Doppelbett + 1 Schlafsofa" },
        { title: "Familienzimmer mit Dusche", price: "Ab 950 UAH/Nacht", capacity: "Bis zu 4 G\u00e4ste", area: "35 m\u00b2", beds: "1 Doppelbett + 1 Schlafsofa" },
        { title: "Superior-Zweibettzimmer", price: "Ab 850 UAH/Nacht", capacity: "2 G\u00e4ste", area: "20 m\u00b2", beds: "2 Einzelbetten" },
      ]),
      book: "BUCHEN",
    },
    restaurant: {
      subtitle: "GASTRONOMIE", title: "MEN\u00dc DER UNBEZWUNGENEN",
      description: "Erleben Sie authentische podolische K\u00fcche in unserem Restaurant in der Frantsyskanska Str. 10. Gerichte, die von der Geschichte inspiriert sind.",
      breakfast: "Fr\u00fchst\u00fcck f\u00fcr G\u00e4ste: Herzhaftes \"Kosaken-Fr\u00fchst\u00fcck\" und andere Morgengerichte.",
      dishes: [
        { name: "Derun mit Schinken", price: "260 UAH" },
        { name: "Bograch im Roggenbrot", price: "230 UAH" },
        { name: "Wareniki mit Flusskrebsen", price: "260 UAH" },
        { name: "Podolischer K\u00e4sekuchen mit Birne", price: "170 UAH" },
      ],
      menuBtn: "VOLLST\u00c4NDIGE SPEISEKARTE",
    },
    gallery: { subtitle: "GALERIE", title: "ATMOSPH\u00c4RE DES KOMPLEXES" },
    reviews: {
      subtitle: "BEWERTUNGEN", title: "WAS UNSERE G\u00c4STE SAGEN", ratingLabel: "Ausgezeichnet", ratingValue: "9.5",
      testimonials: [
        { name: "Olga", text: "Gute Lage, sauber, das Gel\u00e4nde ist gepflegt und ordentlich, die Verwaltung ist freundlich und aufmerksam.", rating: 10 },
        { name: "Anna", text: "Angenehmes Personal, saubere und warme Zimmer. Ruhige Stra\u00dfe, in der N\u00e4he der Festung.", rating: 10 },
        { name: "Kseniia", text: "Wir waren auf der Durchreise, und das Wichtigste unterwegs ist Schlaf. Das Bett, die Decke, die Kissen und vor allem die Matratze - 5+. Vielen Dank f\u00fcr Ihre Gastfreundschaft, ich empfehle es.", rating: 10 },
        { name: "Oleksandr", text: "Ein ganz anst\u00e4ndiger Ort. Bis zur Altstadt sind es 15 Minuten gem\u00fctlicher Fu\u00dfweg. Es gibt Parkpl\u00e4tze, WLAN. Ein sch\u00f6ner Innenhof. Ger\u00e4umige Zimmer mit K\u00fchlschrank. Sauber.", rating: 9 },
        { name: "Tetjana", text: "Die Zimmer sind sauber und gem\u00fctlich. Die W\u00e4sche ist schneewei\u00df. Angenehme Eindr\u00fccke.", rating: 10 },
        { name: "Tetjana", text: "Alles ist sauber und ordentlich. Sehr angenehme Administratorin. Tolles, gesundes Fr\u00fchst\u00fcck, sch\u00f6ne Tischdekoration.", rating: 10 },
        { name: "Olga", text: "Die Zimmer sind wunderbar, das Personal ist ausgezeichnet, die Lage ist sehr g\u00fcnstig! Die Kinder sind begeistert und wollen wiederkommen.", rating: 10 },
        { name: "Anastasiia", text: "G\u00fcnstige Lage, das Zimmer hatte eine Klimaanlage, ziemlich sauber. F\u00fcr einen kurzen Aufenthalt ist das Hotel gut.", rating: 9 },
      ],
    },
    location: {
      subtitle: "STANDORT & WICHTIGE INFORMATIONEN", title: "WIE SIE UNS FINDEN & WAS SIE WISSEN M\u00dcSSEN",
      hotelLabel: "Hotel", hotelAddress: "Frantsyskanska Str. 10, Kamjanez-Podilskyj, Oblast Chmelnyzkyj, 32301",
      restaurantLabel: "Restaurant", restaurantAddress: "Frantsyskanska Str. 10, Kamjanez-Podilskyj, Oblast Chmelnyzkyj, 32301",
      importantInfo: "Wichtige Informationen",
      faq: [
        { title: "Parkplatz", content: "Kostenlose Privatparkpl\u00e4tze stehen auf dem Gel\u00e4nde oder in der N\u00e4he des Hotels f\u00fcr G\u00e4ste zur Verf\u00fcgung. Die Anzahl der Pl\u00e4tze kann in der Hochsaison begrenzt sein." },
        { title: "Ein- und Auschecken", content: "Check-in ab 14:00 Uhr, Check-out bis 12:00 Uhr." },
        { title: "Unterkunftsregeln", content: "Die Bezahlung f\u00fcr Unterkunft und Dienstleistungen erfolgt ausschlie\u00dflich in bar (kein Kartenterminal vorhanden). Bitte ber\u00fccksichtigen Sie dies bei der Reiseplanung. Familienzimmer sind verf\u00fcgbar, Kinder sind willkommen. Bei der Anreise kann eine Barkaution von 400 UAH erhoben werden, die beim Auschecken erstattet wird." },
        { title: "Trinkwasser in den Zimmern", content: "Jedes Zimmer ist mit einem Wasserkocher und einem grundlegenden Geschirrset f\u00fcr Ihren Komfort ausgestattet." },
        { title: "Fr\u00fcher Check-in", content: "Ein fr\u00fcher Check-in oder sp\u00e4ter Check-out ist auf Anfrage m\u00f6glich, abh\u00e4ngig von der Verf\u00fcgbarkeit, und kann mit zus\u00e4tzlichen Kosten verbunden sein." },
        { title: "Haustierfreundliche Unterkunft (Pet-friendly)", content: "Unser Hotel hei\u00dft G\u00e4ste mit Haustieren herzlich willkommen. Die Unterbringung mit Tieren ist auf vorherige Anfrage gestattet. Bitte beachten Sie, dass eine moderate Zusatzgeb\u00fchr anfallen kann. Bitte informieren Sie uns bei der Buchung \u00fcber Ihr Haustier." },
      ],
    },
    footer: {
      brandDesc: "Hotel complex in the heart of historic Kamjanez-Podilskyj. Cossack spirit and modern comfort.",
      navHeading: "NAVIGATION", addressHeading: "KONTAKT",
      hotelPhoneLabel: "Hotel", restaurantPhoneLabel: "Restaurant",
      hotelPhone: "+380673811554", restaurantPhone: "+380677677340",
      copyright: "\u00a9 2026 Taras Bulba. Alle Rechte vorbehalten.",
    },
  },
  FR: {
    dateLocale: "fr-FR",
    brandName: "TARAS BULBA",
    nav: { about: "\u00c0 propos", amenities: "Services", rooms: "Chambres", restaurant: "Restaurant", gallery: "Galerie", reviews: "Avis", location: "Emplacement", contacts: "Contacts", book: "R\u00c9SERVER" },
    hero: {
      headline: "L'ESPRIT COSAQUE\nAU C\u0152UR DE LA VIEILLE VILLE",
      subheadline: "D\u00e9couvrez l'atmosph\u00e8re unique de l'\u00e9poque cosaque alli\u00e9e au confort moderne et \u00e0 l'hospitalit\u00e9 au c\u0153ur de la ville historique de Kamianets-Podilsky\u00ef",
      checkin: "Arriv\u00e9e", checkout: "D\u00e9part", guests: "Voyageurs", selectDate: "Choisir la date", adults: "voyageurs", search: "V\u00c9RIFIER LA DISPONIBILIT\u00c9",
      statsRatingValue: "9,5", statsRatingLabel: "Note / 10", statsRoomsValue: "48", statsRoomsLabel: "Chambres confortables", statsFortressValue: "5 MIN", statsFortressLabel: "Jusqu'\u00e0 la forteresse",
    },
    about: {
      subtitle: "\u00c0 PROPOS DU COMPLEXE", title: "HISTOIRE ET MODERNIT\u00c9 EN UN SEUL LIEU",
      description: "Le complexe h\u00f4telier Taras Bulba est situ\u00e9 dans le quartier historique le plus important de Kamianets-Podilsky\u00ef - au c\u0153ur de la Vieille Ville. La particularit\u00e9 principale de l'\u00e9tablissement est l'esprit cosaque : le concept est li\u00e9 aux hetmans c\u00e9l\u00e8bres de l'Ukraine, dont les portraits ornent les int\u00e9rieurs et inspirent par leur histoire. Le complexe comprend deux b\u00e2timents (2007 et 2020) comptant 48 chambres, un centre SPA moderne, ainsi qu'un restaurant concept avec bar et terrasse d'\u00e9t\u00e9 proposant une cuisine podolienne authentique.",
    },
    amenities: {
      subtitle: "SERVICES", title: "VOTRE CONFORT - NOTRE PRIORIT\u00c9",
      items: [
        { title: "Centre SPA", desc: "Sauna, hammam, bain traditionnel" },
        { title: "Wi-Fi gratuit", desc: "Internet haut d\u00e9bit dans tout l'\u00e9tablissement" },
        { title: "Restaurant & Bar concept", desc: "Cuisine podolienne authentique" },
        { title: "Animaux accept\u00e9s", desc: "Les animaux sont les bienvenus" },
        { title: "R\u00e9ception 24h/24", desc: "Enregistrement confortable \u00e0 toute heure" },
        { title: "Parking priv\u00e9 gratuit", desc: "Parking ferm\u00e9 sur place" },
      ],
    },
    rooms: {
      subtitle: "H\u00c9BERGEMENT", title: "LUXE DANS CHAQUE D\u00c9TAIL",
      tagLabels: { ac: "Climatisation", bathroom: "Salle de bain priv\u00e9e", tv: "T\u00e9l\u00e9vision", wifi: "Wi-Fi gratuit", fridge: "R\u00e9frig\u00e9rateur", kettle: "Bouilloire", bath: "Baignoire" },
      items: makeRooms([
        { title: "Appartements", price: "\u00c0 partir de 800 UAH/nuit", capacity: "Jusqu'\u00e0 4 voyageurs", area: "35 m\u00b2", beds: "1 grand lit double + 1 canap\u00e9-lit" },
        { title: "Appartements Studio", price: "\u00c0 partir de 1200 UAH/nuit", capacity: "Jusqu'\u00e0 4 voyageurs", area: "50 m\u00b2", beds: "1 tr\u00e8s grand lit double + 1 canap\u00e9-lit" },
        { title: "Suite Familiale", price: "\u00c0 partir de 1000 UAH/nuit", capacity: "Jusqu'\u00e0 4 voyageurs", area: "35 m\u00b2", beds: "1 grand lit double + 1 canap\u00e9-lit" },
        { title: "Chambre Familiale avec Douche", price: "\u00c0 partir de 950 UAH/nuit", capacity: "Jusqu'\u00e0 4 voyageurs", area: "35 m\u00b2", beds: "1 lit double + 1 canap\u00e9-lit" },
        { title: "Chambre Sup\u00e9rieure Twin", price: "\u00c0 partir de 850 UAH/nuit", capacity: "2 voyageurs", area: "20 m\u00b2", beds: "2 lits simples" },
      ]),
      book: "R\u00c9SERVER",
    },
    restaurant: {
      subtitle: "GASTRONOMIE", title: "MENU DES INVAINCUS",
      description: "D\u00e9couvrez la cuisine podolienne authentique dans notre restaurant au 10, rue Frantsyskanska. Des plats inspir\u00e9s par l'histoire.",
      breakfast: "Petits-d\u00e9jeuners pour les clients : Copieux \u00ab Petit-d\u00e9jeuner cosaque \u00bb et autres plats du matin.",
      dishes: [
        { name: "Derun au jambon", price: "260 UAH" },
        { name: "Bograch dans le pain de seigle", price: "230 UAH" },
        { name: "Varenyky aux \u00e9crevisses", price: "260 UAH" },
        { name: "Cheesecake podolien \u00e0 la poire", price: "170 UAH" },
      ],
      menuBtn: "VOIR LE MENU COMPLET",
    },
    gallery: { subtitle: "GALERIE", title: "ATMOSPH\u00c8RE DU COMPLEXE" },
    reviews: {
      subtitle: "AVIS", title: "CE QUE DISENT NOS CLIENTS", ratingLabel: "Exceptionnel", ratingValue: "9.5",
      testimonials: [
        { name: "Olga", text: "Bon emplacement, propre, le territoire est bien entretenu et soign\u00e9, l'administration est sympathique et attentionn\u00e9e.", rating: 10 },
        { name: "Anna", text: "Personnel agr\u00e9able, chambres propres et chaudes. Rue calme, pr\u00e8s de la forteresse.", rating: 10 },
        { name: "Kseniia", text: "Nous \u00e9tions de passage, et l'essentiel sur la route est de dormir. Le lit, la couverture, les oreillers, et surtout le matelas - 5+. Merci beaucoup pour votre hospitalit\u00e9, je le recommande.", rating: 10 },
        { name: "Oleksandr", text: "Un endroit tout \u00e0 fait convenable. \u00c0 15 minutes \u00e0 pied de la vieille ville. Il y a un parking, le Wi-Fi. Une jolie cour int\u00e9rieure. Des chambres spacieuses avec r\u00e9frig\u00e9rateur. Propre.", rating: 9 },
        { name: "Tetiana", text: "Les chambres sont propres et confortables. Le linge est d'une blancheur \u00e9clatante. Impressions agr\u00e9ables.", rating: 10 },
        { name: "Tetiana", text: "Tout est propre et soign\u00e9. L'administratrice est tr\u00e8s agr\u00e9able. Petit d\u00e9jeuner excellent et sain, belle d\u00e9coration de table.", rating: 10 },
        { name: "Olga", text: "Les chambres sont merveilleuses, le personnel est excellent, l'emplacement est tr\u00e8s pratique ! Les enfants sont ravis et veulent revenir.", rating: 10 },
        { name: "Anastasiia", text: "Emplacement pratique, il y avait la climatisation dans la chambre, assez propre. Pour un court s\u00e9jour, l'h\u00f4tel est bien.", rating: 9 },
      ],
    },
    location: {
      subtitle: "EMPLACEMENT & INFORMATIONS IMPORTANTES", title: "COMMENT NOUS TROUVER & CE QU'IL FAUT SAVOIR",
      hotelLabel: "H\u00f4tel", hotelAddress: "10, rue Frantsyskanska, Kamianets-Podilsky\u00ef, Oblast de Khmelnytskyi, 32301",
      restaurantLabel: "Restaurant", restaurantAddress: "10, rue Frantsyskanska, Kamianets-Podilsky\u00ef, Oblast de Khmelnytskyi, 32301",
      importantInfo: "Informations importantes",
      faq: [
        { title: "Parking", content: "Un parking priv\u00e9 gratuit est disponible sur place ou \u00e0 proximit\u00e9 de l'h\u00f4tel pour les clients. Le nombre de places peut \u00eatre limit\u00e9 en haute saison." },
        { title: "Arriv\u00e9e et d\u00e9part", content: "L'enregistrement se fait \u00e0 partir de 14h00, le d\u00e9part avant 12h00." },
        { title: "R\u00e8gles d'h\u00e9bergement", content: "Le paiement de l'h\u00e9bergement et des services se fait exclusivement en esp\u00e8ces (pas de terminal de paiement). Veuillez en tenir compte lors de la planification de votre voyage. Des chambres familiales sont disponibles, les enfants sont les bienvenus. Un d\u00e9p\u00f4t de garantie de 400 UAH peut \u00eatre demand\u00e9 \u00e0 l'arriv\u00e9e, rembours\u00e9 au d\u00e9part." },
        { title: "Eau potable dans les chambres", content: "Chaque chambre est \u00e9quip\u00e9e d'une bouilloire \u00e9lectrique et d'un set de vaisselle de base pour votre confort." },
        { title: "Arriv\u00e9e anticip\u00e9e", content: "Une arriv\u00e9e anticip\u00e9e ou un d\u00e9part tardif est possible sur demande pr\u00e9alable, sous r\u00e9serve de disponibilit\u00e9, et peut entra\u00eener un suppl\u00e9ment." },
        { title: "H\u00e9bergement acceptant les animaux (Pet-friendly)", content: "Notre h\u00f4tel accueille chaleureusement les clients avec leurs animaux de compagnie. L'h\u00e9bergement avec des animaux est autoris\u00e9 sur demande pr\u00e9alable. Veuillez noter qu'un suppl\u00e9ment mod\u00e9r\u00e9 peut s'appliquer, nous vous prions de nous informer de votre animal lors de la r\u00e9servation." },
      ],
    },
    footer: {
      brandDesc: "Complexe h\u00f4telier au c\u0153ur de la ville historique de Kamianets-Podilsky\u00ef. Esprit cosaque et confort moderne.",
      navHeading: "NAVIGATION", addressHeading: "CONTACTS",
      hotelPhoneLabel: "H\u00f4tel", restaurantPhoneLabel: "Restaurant",
      hotelPhone: "+380673811554", restaurantPhone: "+380677677340",
      copyright: "\u00a9 2026 Taras Bulba. Tous droits r\u00e9serv\u00e9s.",
    },
  },
  PL: {
    dateLocale: "pl-PL",
    brandName: "TARAS BULBA",
    nav: { about: "O nas", amenities: "Udogodnienia", rooms: "Pokoje", restaurant: "Restauracja", gallery: "Galeria", reviews: "Opinie", location: "Lokalizacja", contacts: "Kontakt", book: "ZAREZERWUJ" },
    hero: {
      headline: "DUCH KOZACTWA\nW SERCU STAREGO MIASTA",
      subheadline: "Pocz\u0105j niepowtarzaln\u0105 atmosfer\u0119 epoki kozackiej po\u0142\u0105czon\u0105 z nowoczesnym komfortem i go\u015bcinno\u015bci\u0105 w samym sercu historycznego Kamie\u0144ca Podolskiego",
      checkin: "Zameld.", checkout: "Wymeld.", guests: "Go\u015bcie", selectDate: "Wybierz dat\u0119", adults: "os\u00f3b", search: "SPRAWD\u0179 DOST\u0118PNO\u015a\u0106",
      statsRatingValue: "9,5", statsRatingLabel: "Ocena / 10", statsRoomsValue: "48", statsRoomsLabel: "Przytulnych pokoi", statsFortressValue: "5 MIN", statsFortressLabel: "Do Starej Twierdzy",
    },
    about: {
      subtitle: "O KOMPLEKSIE", title: "HISTORIA I NOWOCZESNO\u015a\u0106 W JEDNYM MIEJSCU",
      description: "Kompleks hotelowy Taras Bulba znajduje si\u0119 w najwa\u017cniejszym historycznym obszarze Kamie\u0144ca Podolskiego - w sercu Starego Miasta. G\u0142\u00f3wn\u0105 cech\u0105 obiektu jest duch kozactwa: koncepcja jest zwi\u0105zana z wybitnymi hetmanami Ukrainy, kt\u00f3rych portrety zdob\u0105 wn\u0119trza i inspiruj\u0105 swoj\u0105 histori\u0105. Kompleks obejmuje dwa budynki (z 2007 i 2020 roku) na 48 pokoi, nowoczesne centrum SPA, a tak\u017ce koncepcyjn\u0105 restauracj\u0119 z barem i letnim tarasem, gdzie serwowane s\u0105 autentyczne dania podolskie.",
    },
    amenities: {
      subtitle: "UDOGODNIENIA", title: "TW\u00d3J KOMFORT - NASZ PRIORYTET",
      items: [
        { title: "Centrum SPA", desc: "Sauna, hammam, tradycyjna \u0142a\u017ania" },
        { title: "Darmowe Wi-Fi", desc: "Szybki internet na ca\u0142ym terenie" },
        { title: "Restauracja koncepcyjna i bar", desc: "Autentyczna kuchnia podolska" },
        { title: "Przyjazny zwierz\u0119tom", desc: "Zwierz\u0119ta domowe s\u0105 mile widziane" },
        { title: "Recepcja 24h", desc: "Wygodne zameldowanie o ka\u017cdej porze" },
        { title: "Bezp\u0142atny parking prywatny", desc: "Zamkni\u0119ty parking na terenie" },
      ],
    },
    rooms: {
      subtitle: "ZAKWATEROWANIE", title: "LUKSUS W KA\u017bDYM DETALU",
      tagLabels: { ac: "Klimatyzacja", bathroom: "Prywatna \u0142azienka", tv: "Telewizor", wifi: "Darmowe Wi-Fi", fridge: "Lod\u00f3wka", kettle: "Czajnik", bath: "Wanna" },
      items: makeRooms([
        { title: "Apartamenty", price: "Od 800 UAH/noc", capacity: "Do 4 go\u015bci", area: "35 m\u00b2", beds: "1 du\u017ce \u0142\u00f3\u017cko podw\u00f3jne + 1 sofa" },
        { title: "Apartamenty Studio", price: "Od 1200 UAH/noc", capacity: "Do 4 go\u015bci", area: "50 m\u00b2", beds: "1 bardzo du\u017ce \u0142\u00f3\u017cko podw\u00f3jne + 1 sofa" },
        { title: "Apartament Rodzinny", price: "Od 1000 UAH/noc", capacity: "Do 4 go\u015bci", area: "35 m\u00b2", beds: "1 du\u017ce \u0142\u00f3\u017cko podw\u00f3jne + 1 sofa" },
        { title: "Pok\u00f3j Rodzinny z Prysznicem", price: "Od 950 UAH/noc", capacity: "Do 4 go\u015bci", area: "35 m\u00b2", beds: "1 \u0142\u00f3\u017cko podw\u00f3jne + 1 sofa" },
        { title: "Pok\u00f3j Superior Twin", price: "Od 850 UAH/noc", capacity: "2 go\u015bci", area: "20 m\u00b2", beds: "2 \u0142\u00f3\u017cka pojedyncze" },
      ]),
      book: "ZAREZERWUJ",
    },
    restaurant: {
      subtitle: "GASTRONOMIA", title: "MENU NIEZ\u0141OMNYCH",
      description: "Poznaj autentyczn\u0105 kuchni\u0119 podolsk\u0105 w naszej restauracji przy ul. Franciszka\u0144skiej 10. Dania inspirowane histori\u0105.",
      breakfast: "\u015aniadania dla go\u015bci: Syte \"\u015aniadanie kozackie\" i inne potrawy poranne.",
      dishes: [
        { name: "Deruny z szynk\u0105", price: "260 UAH" },
        { name: "Bogracz w chlebie \u017cytnim", price: "230 UAH" },
        { name: "Wareniki z rakami", price: "260 UAH" },
        { name: "Podolski sernik z gruszk\u0105", price: "170 UAH" },
      ],
      menuBtn: "ZOBACZ PE\u0141NE MENU",
    },
    gallery: { subtitle: "GALERIA", title: "ATMOSFERA KOMPLEKSU" },
    reviews: {
      subtitle: "OPINIE", title: "CO M\u00d3WI\u0104 NASI GO\u015aCIE", ratingLabel: "Doskona\u0142y", ratingValue: "9.5",
      testimonials: [
        { name: "Olga", text: "Dobra lokalizacja, czysto, teren jest zadbany i schludny, administracja jest przyjazna i uwa\u017cna.", rating: 10 },
        { name: "Anna", text: "Przyjemny personel, czyste i ciep\u0142e pokoje. Cicha ulica, blisko twierdzy.", rating: 10 },
        { name: "Ksenia", text: "Byli\u015bmy przejazdem, a w drodze najwa\u017cniejsze to si\u0119 wyspa\u0107. \u0141\u00f3\u017cko, koc, poduszki, a przede wszystkim materac - na 5+. Bardzo dzi\u0119kujemy za go\u015bcinno\u015b\u0107, polecam.", rating: 10 },
        { name: "O\u0142eksandr", text: "Ca\u0142kiem przyzwoite miejsce. Do Starego Miasta 15 minut spacerem. Jest parking, Wi-Fi. \u0141adny dziedziniec. Przestronne pokoje z lod\u00f3wk\u0105. Czysto.", rating: 9 },
        { name: "Tetiana", text: "Pokoje s\u0105 czyste i przytulne. Po\u015bciel jest \u015bnie\u017cnobia\u0142a. Przyjemne wra\u017cenia.", rating: 10 },
        { name: "Tetiana", text: "Wszystko jest czyste i schludne. Bardzo mi\u0142a administratorka. \u015awietne, zdrowe \u015bniadanie, \u0142adne nakrycie sto\u0142u.", rating: 10 },
        { name: "Olga", text: "Pokoje s\u0105 wspania\u0142e, personel doskona\u0142y, lokalizacja bardzo dogodna! Dzieci s\u0105 zachwycone i chc\u0105 przyjecha\u0107 ponownie.", rating: 10 },
        { name: "Anastazja", text: "Dogodna lokalizacja, w pokoju by\u0142a klimatyzacja, do\u015b\u0107 czysto. Na kr\u00f3tki pobyt hotel jest dobry.", rating: 9 },
      ],
    },
    location: {
      subtitle: "LOKALIZACJA I WA\u017bNE INFORMACJE", title: "JAK NAS ZNALE\u0179\u0106 I CO WARTO WIEDZIE\u0106",
      hotelLabel: "Hotel", hotelAddress: "ul. Franciszka\u0144ska 10, Kamieniec Podolski, Obw\u00f3d chmielnicki, 32301",
      restaurantLabel: "Restauracja", restaurantAddress: "ul. Franciszka\u0144ska 10, Kamieniec Podolski, Obw\u00f3d chmielnicki, 32301",
      importantInfo: "Wa\u017cne informacje",
      faq: [
        { title: "Parking", content: "Bezp\u0142atny prywatny parking jest dost\u0119pny na terenie lub w pobli\u017cu hotelu dla go\u015bci. Liczba miejsc mo\u017ce by\u0107 ograniczona w sezonie." },
        { title: "Zameldowanie i wymeldowanie", content: "Zameldowanie od godziny 14:00, wymeldowanie do godziny 12:00." },
        { title: "Zasady zakwaterowania", content: "Op\u0142ata za zakwaterowanie i us\u0142ugi dokonywana jest wy\u0142\u0105cznie got\u00f3wk\u0105 (brak terminala p\u0142atniczego). Prosimy o uwzgl\u0119dnienie tego przy planowaniu podr\u00f3\u017cy. Pokoje rodzinne s\u0105 dost\u0119pne, dzieci s\u0105 mile widziane. Przy zameldowaniu mo\u017ce by\u0107 pobrana kaucja got\u00f3wkowa w wysoko\u015bci 400 UAH, zwracana przy wymeldowaniu." },
        { title: "Woda pitna w pokojach", content: "Ka\u017cdy pok\u00f3j jest wyposa\u017cony w czajnik elektryczny i podstawowy zestaw naczy\u0144 dla Pa\u0144stwa wygody." },
        { title: "Wczesne zameldowanie", content: "Wczesne zameldowanie lub p\u00f3\u017ane wymeldowanie jest mo\u017cliwe na wcze\u015bniejsze zapytanie, w zale\u017cno\u015bci od dost\u0119pno\u015bci pokoi, i mo\u017ce wymaga\u0107 dodatkowej op\u0142aty." },
        { title: "Zakwaterowanie przyjazne zwierz\u0119tom (Pet-friendly)", content: "Nasz hotel z rado\u015bci\u0105 przyjmuje go\u015bci ze zwierz\u0119tami domowymi. Zakwaterowanie ze zwierz\u0119tami jest dozwolone po wcze\u015bniejszym zapytaniu. Prosz\u0119 pami\u0119ta\u0107, \u017ce mo\u017ce obowi\u0105zywa\u0107 umiarkowana dodatkowa op\u0142ata, dlatego prosimy o poinformowanie nas o zwierz\u0119ciu podczas rezerwacji." },
      ],
    },
    footer: {
      brandDesc: "Kompleks hotelowy w sercu historycznego Kamie\u0144ca Podolskiego. Duch kozactwa i nowoczesny komfort.",
      navHeading: "NAWIGACJA", addressHeading: "KONTAKT",
      hotelPhoneLabel: "Hotel", restaurantPhoneLabel: "Restauracja",
      hotelPhone: "+380673811554", restaurantPhone: "+380677677340",
      copyright: "\u00a9 2026 Taras Bulba. Wszelkie prawa zastrze\u017cone.",
    },
  },
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  locale: "UK",
  setLocale: () => {},
  t: translations.UK,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("UK");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && translations[saved]) setLocale(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
    const langMap: Record<Locale, string> = { UK: "uk", EN: "en", DE: "de", FR: "fr", PL: "pl" };
    document.documentElement.lang = langMap[locale];
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
