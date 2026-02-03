import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export const SITE_CONFIG = {
    name: 'Tamberma Restaurant & Bar',
    description: 'Experience Indian, Nigerian, Chinese, Continental, BBQ & Grill, and craft cocktails in a serene, African-inspired setting at Tamberma Restaurant & Bar, Ibadan.',

    contact: {
        address: "Quarters 894, Rev'd Oyebode Crescent, Iyaganku, Ibadan",
        addressShort: "Iyaganku, Ibadan",
        phone: '+234 805 409 0607',
        email: 'tambermang@gmail.com',
        hours: 'Open Daily: 12:00 PM - 10:30 PM',
        googleMapsUrl: 'https://maps.google.com/?q=Tamberma+Restaurant+Ibadan'
    },

    socials: [
        {
            id: 'instagram',
            label: 'Instagram',
            url: 'https://instagram.com/tamberma_ibadan',
            handle: '@tamberma_ibadan',
            icon: Instagram
        },
        {
            id: 'facebook',
            label: 'Facebook',
            url: 'https://facebook.com/TambermaRestaurant',
            handle: 'Tamberma Restaurant & Bar',
            icon: Facebook
        },
        {
            id: 'twitter',
            label: 'Twitter', // Assuming Twitter exists based on Footer usage, though URL was '#'
            url: '#',
            handle: '@tamberma',
            icon: Twitter
        },
        {
            id: 'tiktok',
            label: 'TikTok',
            url: 'https://www.tiktok.com/@helloibadan',
            handle: '@helloibadan',
            // icon handled in component if needed or map lucide icon
        }
    ],

    nav: {
        main: [
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
            {
                name: 'Menu', href: '/menu', dropdown: [
                    { name: 'Full Menu', href: '/menu' },
                    { name: 'Menu Gallery', href: '/menu-gallery' },
                ]
            },
            { name: 'Gallery', href: '/gallery' },
            { name: 'Contact', href: '/contact' },
        ],
        footer: [
            { name: 'Menu', href: '/menu' },
            { name: 'About', href: '/about' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'Contact', href: '/contact' },
            { name: 'Reservations', href: '/contact' }
        ]
    }
};
