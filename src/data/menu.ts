// Menu Data Types
export interface MenuItem {
    id: string
    name: string
    price_ngn: number | null
    price_options_ngn?: number[]
    tags: string[]
    notes?: string
    featured?: boolean
    imageUrl?: string
}

export interface Subcategory {
    subcategory: string
    price_ngn?: number
    items: MenuItem[]
}

export interface MenuCategory {
    category: string
    items?: MenuItem[]
    subcategories?: Subcategory[]
    plain_rice_options?: MenuItem[]
}

export interface MenuData {
    restaurant: {
        name: string
        branch: string
        currency: string
        pricing_note: string
    }
    menu: MenuCategory[]
    meta: {
        vat_rate_percent: number
        vat_included_in_prices: boolean
    }
}

export const menuData: MenuData = {
    "restaurant": {
        "name": "Tamberma Restaurant",
        "branch": "Ibadan",
        "currency": "NGN",
        "pricing_note": "All prices exclude 7.5% VAT"
    },
    "menu": [
        {
            "category": "Salads",
            "items": [
                { "id": "salads_caesar_salad_chicken", "name": "Caesar Salad (Chicken)", "price_ngn": 14000, "tags": ["salad"] },
                { "id": "salads_tamberma_special_chef_salad", "name": "Tamberma Special Chef Salad", "price_ngn": 15000, "tags": ["salad"], "featured": true, "imageUrl": "/images/menu/tamberma-special.jpg" }
            ]
        },
        {
            "category": "Starters",
            "items": [
                { "id": "starters_chicken_tenders", "name": "Chicken Tenders", "price_ngn": 12000, "tags": ["starter"] },
                { "id": "starters_crispy_calamari_rings", "name": "Crispy Calamari Rings", "price_ngn": 16000, "tags": ["starter", "seafood"], "featured": true, "imageUrl": "/images/menu/Spring-Rolls-Chicken.jpeg" },
                { "id": "starters_fish_fingers", "name": "Fish Fingers", "price_ngn": 16000, "tags": ["starter", "seafood"] },
                { "id": "starters_prawn_tempura", "name": "Prawn Tempura", "price_ngn": 23000, "tags": ["starter", "seafood"], "featured": true, "imageUrl": "/images/menu/Tandoori-Prawns.jpg" },
                { "id": "starters_butter_garlic_prawns", "name": "Butter Garlic Prawns", "price_ngn": 23000, "tags": ["starter", "seafood"] }
            ]
        },
        {
            "category": "Grill House (Indian BBQ)",
            "subcategories": [
                {
                    "subcategory": "Vegetarian",
                    "items": [
                        { "id": "bbq_paneer_tikka", "name": "Paneer Tikka", "price_ngn": 12500, "tags": ["bbq", "veg"], "featured": true, "imageUrl": "/images/menu/grill-house-menu-1.jpg" },
                        { "id": "bbq_stuffed_tandoori_potato", "name": "Stuffed Tandoori Potato", "price_ngn": 12500, "tags": ["bbq", "veg"] },
                        { "id": "bbq_tandoori_sabji", "name": "Tandoori Sabji", "price_ngn": 12500, "tags": ["bbq", "veg"] },
                        { "id": "bbq_veg_seekh_kebab", "name": "Veg Seekh Kebab", "price_ngn": 10500, "tags": ["bbq", "veg"] },
                        { "id": "bbq_kasturi_paneer_tikka", "name": "Kasturi Paneer Tikka", "price_ngn": 12500, "tags": ["bbq", "veg"] },
                        { "id": "bbq_malai_paneer_tikka", "name": "Malai Paneer Tikka", "price_ngn": 12500, "tags": ["bbq", "veg"] }
                    ]
                },
                {
                    "subcategory": "Chicken",
                    "items": [
                        { "id": "bbq_tandoori_chicken_half", "name": "Tandoori Chicken (Half)", "price_ngn": 14500, "tags": ["bbq", "chicken"], "featured": true, "imageUrl": "/images/menu/grill-house-menu-2.jpg" },
                        { "id": "bbq_tandoori_chicken_full", "name": "Tandoori Chicken (Full)", "price_ngn": 19500, "tags": ["bbq", "chicken"] },
                        { "id": "bbq_awadhi_chicken_tikka", "name": "Awadhi Chicken Tikka", "price_ngn": 12000, "tags": ["bbq", "chicken"] },
                        { "id": "bbq_chicken_reshmi_kebab", "name": "Chicken Reshmi Kebab", "price_ngn": 12000, "tags": ["bbq", "chicken"] },
                        { "id": "bbq_chicken_malwani_tikka", "name": "Chicken Malwani Tikka", "price_ngn": 12000, "tags": ["bbq", "chicken"] },
                        { "id": "bbq_seekh_kebab_chicken", "name": "Seekh Kebab (Chicken)", "price_ngn": 12000, "tags": ["bbq", "chicken"] },
                        { "id": "bbq_chicken_pahadi_tikka", "name": "Chicken Pahadi Tikka", "price_ngn": 12000, "tags": ["bbq", "chicken"] }
                    ]
                },
                {
                    "subcategory": "Mutton/Lamb",
                    "items": [
                        { "id": "bbq_galouti_kebab", "name": "Galouti Kebab", "price_ngn": 18500, "tags": ["bbq", "mutton"] },
                        { "id": "bbq_seekh_kebab_mutton", "name": "Seekh Kebab (Mutton)", "price_ngn": 18500, "tags": ["bbq", "mutton"] }
                    ]
                },
                {
                    "subcategory": "Beef & Suya",
                    "items": [
                        { "id": "bbq_beef_suya", "name": "Beef Suya", "price_ngn": 6000, "tags": ["suya", "beef"] },
                        { "id": "bbq_chicken_suya", "name": "Chicken Suya", "price_ngn": 9000, "tags": ["suya", "chicken"] }
                    ]
                },
                {
                    "subcategory": "Fish",
                    "items": [
                        { "id": "bbq_fish_tikka", "name": "Fish Tikka", "price_ngn": 17500, "tags": ["bbq", "fish"] },
                        { "id": "bbq_fish_reshmi_kebab", "name": "Fish Reshmi Kebab", "price_ngn": 17500, "tags": ["bbq", "fish"] },
                        { "id": "bbq_sarson_fish_tikka", "name": "Sarson Fish Tikka", "price_ngn": 17500, "tags": ["bbq", "fish"] },
                        { "id": "bbq_achari_fish_tikka", "name": "Achari Fish Tikka", "price_ngn": 17500, "tags": ["bbq", "fish"] }
                    ]
                },
                {
                    "subcategory": "Prawns",
                    "items": [
                        { "id": "bbq_tandoori_prawns", "name": "Tandoori Prawns", "price_ngn": 23000, "tags": ["bbq", "prawns", "seafood"] },
                        { "id": "bbq_tandoori_butter_garlic_prawns", "name": "Tandoori Butter Garlic Prawns", "price_ngn": 23000, "tags": ["bbq", "prawns", "seafood"] },
                        { "id": "bbq_achari_prawns", "name": "Achari Prawns", "price_ngn": 23000, "tags": ["bbq", "prawns", "seafood"] },
                        { "id": "bbq_kandhari_prawns", "name": "Kandhari Prawns", "price_ngn": 23000, "tags": ["bbq", "prawns", "seafood"] }
                    ]
                }
            ]
        },
        {
            "category": "Nigerian Menu",
            "subcategories": [
                {
                    "subcategory": "Appetizers",
                    "items": [
                        { "id": "ng_app_isi_ewu", "name": "Isi Ewu", "price_ngn": 17000, "tags": ["nigerian", "appetizer"], "featured": true, "imageUrl": "/images/menu/Isi-Ewu.jpg" },
                        { "id": "ng_app_nkwobi_ponmo", "name": "Nkwobi (Ponmo)", "price_ngn": 16000, "tags": ["nigerian", "appetizer"] },
                        { "id": "ng_app_asun", "name": "Asun", "price_ngn": 10000, "tags": ["nigerian", "appetizer"] },
                        { "id": "ng_app_peppered_gizzard", "name": "Peppered Gizzard", "price_ngn": 10000, "tags": ["nigerian", "appetizer"] },
                        { "id": "ng_app_peppered_beef", "name": "Peppered Beef", "price_ngn": 10000, "tags": ["nigerian", "appetizer"] },
                        { "id": "ng_app_peppered_chicken", "name": "Peppered Chicken", "price_ngn": 9000, "tags": ["nigerian", "appetizer"] },
                        { "id": "ng_app_peppered_prawns", "name": "Peppered Prawns", "price_ngn": 19000, "tags": ["nigerian", "appetizer", "seafood"] },
                        { "id": "ng_app_peppered_goat_meat", "name": "Peppered Goat Meat", "price_ngn": 10000, "tags": ["nigerian", "appetizer"] },
                        { "id": "ng_app_peppered_wings", "name": "Peppered Wings", "price_ngn": 11000, "tags": ["nigerian", "appetizer"] },
                        { "id": "ng_app_peppered_turkey_wings", "name": "Peppered Turkey Wings", "price_ngn": 13000, "tags": ["nigerian", "appetizer"] }
                    ]
                },
                {
                    "subcategory": "Pepper Soup",
                    "items": [
                        { "id": "ng_ps_catfish", "name": "Catfish Pepper Soup", "price_ngn": 16500, "tags": ["nigerian", "soup", "fish"] },
                        { "id": "ng_ps_croaker", "name": "Croaker Fish Pepper Soup", "price_ngn": 18000, "tags": ["nigerian", "soup", "fish"] },
                        { "id": "ng_ps_goat", "name": "Goat Meat Pepper Soup", "price_ngn": 11000, "tags": ["nigerian", "soup"] },
                        { "id": "ng_ps_chicken", "name": "Chicken Pepper Soup", "price_ngn": 10000, "tags": ["nigerian", "soup", "chicken"] },
                        { "id": "ng_ps_turkey", "name": "Turkey Pepper Soup", "price_ngn": 14000, "tags": ["nigerian", "soup"] },
                        { "id": "ng_ps_seafood", "name": "Seafood Pepper Soup", "price_ngn": 23000, "tags": ["nigerian", "soup", "seafood"], "featured": true, "imageUrl": "/images/menu/nigerian-menu-1.jpg" }
                    ]
                },
                {
                    "subcategory": "Native Soups",
                    "items": [
                        { "id": "ng_soup_ogbono", "name": "Ogbono Soup", "price_ngn": 15000, "tags": ["nigerian", "soup"] },
                        { "id": "ng_soup_afang", "name": "Afang Soup", "price_ngn": 8000, "tags": ["nigerian", "soup"] },
                        { "id": "ng_soup_okro", "name": "Okro Soup", "price_ngn": 8000, "tags": ["nigerian", "soup"] },
                        { "id": "ng_soup_edikaikong", "name": "Edikaikong Soup", "price_ngn": 8000, "tags": ["nigerian", "soup"] },
                        { "id": "ng_soup_eforiro", "name": "Eforiro Soup", "price_ngn": 9000, "tags": ["nigerian", "soup"] },
                        { "id": "ng_soup_egusi", "name": "Egusi Soup", "price_ngn": 9000, "tags": ["nigerian", "soup"] },
                        { "id": "ng_soup_bitterleaf", "name": "Bitterleaf Soup", "price_ngn": 9000, "tags": ["nigerian", "soup"] }
                    ]
                },
                {
                    "subcategory": "Premium Seafood Soups",
                    "items": [
                        { "id": "ng_seafood_okro", "name": "Seafood Okro", "price_ngn": 25000, "tags": ["nigerian", "soup", "seafood"] },
                        { "id": "ng_seafood_fisherman", "name": "Fisherman Soup", "price_ngn": 25000, "tags": ["nigerian", "soup", "seafood"] },
                        { "id": "ng_seafood_eforiro", "name": "Seafood Efo Riro", "price_ngn": 25000, "tags": ["nigerian", "soup", "seafood"] },
                        { "id": "ng_seafood_afang", "name": "Seafood Afang", "price_ngn": 25000, "tags": ["nigerian", "soup", "seafood"] },
                        { "id": "ng_seafood_edikaikong", "name": "Seafood Edikaikong", "price_ngn": 25000, "tags": ["nigerian", "soup", "seafood"] }
                    ]
                },
                {
                    "subcategory": "Swallow",
                    "items": [
                        { "id": "ng_swallow_poundo", "name": "Poundo", "price_ngn": 3200, "tags": ["nigerian", "swallow"] },
                        { "id": "ng_swallow_wheat_semo_amala", "name": "Wheat / Semo / Amala", "price_ngn": 3000, "tags": ["nigerian", "swallow"] },
                        { "id": "ng_swallow_eba_starch", "name": "Eba / Starch", "price_ngn": 3000, "tags": ["nigerian", "swallow"] }
                    ]
                },
                {
                    "subcategory": "Proteins (Extra)",
                    "items": [
                        { "id": "ng_protein_goat_meat", "name": "Goat Meat", "price_ngn": 10000, "tags": ["nigerian", "protein"] },
                        { "id": "ng_protein_croaker_fish", "name": "Croaker Fish", "price_ngn": 13000, "tags": ["nigerian", "protein", "fish"] },
                        { "id": "ng_protein_chicken", "name": "Chicken", "price_ngn": 8000, "tags": ["nigerian", "protein", "chicken"] },
                        { "id": "ng_protein_beef", "name": "Beef", "price_ngn": 10000, "tags": ["nigerian", "protein", "beef"] },
                        { "id": "ng_protein_turkey", "name": "Turkey", "price_ngn": 13000, "tags": ["nigerian", "protein"] }
                    ]
                }
            ]
        },
        {
            "category": "Rice Dishes",
            "items": [
                { "id": "rice_seafood_fried_rice", "name": "Seafood Fried Rice", "price_ngn": 14000, "tags": ["rice", "seafood"] },
                { "id": "rice_jollof_full_plate", "name": "Jollof Rice (Full Plate)", "price_ngn": 11000, "tags": ["rice"] },
                { "id": "rice_fried_full_plate", "name": "Fried Rice (Full Plate)", "price_ngn": 11000, "tags": ["rice"] },
                { "id": "rice_chicken_and_chips", "name": "Chicken & Chips", "price_ngn": 14000, "tags": ["rice", "chicken"] }
            ],
            "plain_rice_options": [
                { "id": "rice_plain_basmati", "name": "Basmati Rice", "price_ngn": 6000, "tags": ["rice"] },
                { "id": "rice_plain_jollof", "name": "Jollof Rice", "price_ngn": 6000, "tags": ["rice"] },
                { "id": "rice_plain_fried", "name": "Fried Rice", "price_ngn": 6000, "tags": ["rice"] }
            ]
        },
        {
            "category": "Sides",
            "items": [
                { "id": "sides_yam_chips", "name": "Yam Chips", "price_ngn": 5500, "tags": ["side"] },
                { "id": "sides_french_fries", "name": "French Fries", "price_ngn": 5500, "tags": ["side"] },
                { "id": "sides_plantain_chips", "name": "Plantain Chips", "price_ngn": 5500, "tags": ["side"] },
                { "id": "sides_coleslaw_salad", "name": "Coleslaw Salad", "price_ngn": 4000, "tags": ["side", "salad"] }
            ]
        },
        {
            "category": "Indian Main Course",
            "subcategories": [
                {
                    "subcategory": "Chicken Curries",
                    "price_ngn": 12000,
                    "items": [
                        { "id": "ind_chicken_butter_chicken", "name": "Butter Chicken", "price_ngn": 12000, "tags": ["indian", "chicken", "curry"], "featured": true, "imageUrl": "/images/menu/indian-menu-1.jpg" },
                        { "id": "ind_chicken_murg_kadai", "name": "Murg Kadai", "price_ngn": 12000, "tags": ["indian", "chicken", "curry"] },
                        { "id": "ind_chicken_murg_kolhapuri", "name": "Murg Kolhapuri", "price_ngn": 12000, "tags": ["indian", "chicken", "curry"] },
                        { "id": "ind_chicken_murg_hyderabadi", "name": "Murg Hyderabadi", "price_ngn": 12000, "tags": ["indian", "chicken", "curry"] },
                        { "id": "ind_chicken_murg_chettinad", "name": "Murg Chettinad", "price_ngn": 12000, "tags": ["indian", "chicken", "curry"] },
                        { "id": "ind_chicken_murg_kali_mirch", "name": "Murg Kali Mirch", "price_ngn": 12000, "tags": ["indian", "chicken", "curry"] },
                        { "id": "ind_chicken_tamberma_special_murg", "name": "Tamberma Special Murg", "price_ngn": 12000, "tags": ["indian", "chicken", "curry"], "featured": true, "imageUrl": "/images/menu/tamberma-special.jpg" },
                        { "id": "ind_chicken_murg_tawa_masala", "name": "Murg Tawa Masala", "price_ngn": 12000, "tags": ["indian", "chicken", "curry"] },
                        { "id": "ind_chicken_murg_tikka_masala", "name": "Murg Tikka Masala", "price_ngn": 12000, "tags": ["indian", "chicken", "curry"] }
                    ]
                },
                {
                    "subcategory": "Mutton Curries",
                    "price_ngn": 15000,
                    "items": [
                        { "id": "ind_mutton_gosht_handi", "name": "Gosht Handi", "price_ngn": 15000, "tags": ["indian", "mutton", "curry"] },
                        { "id": "ind_mutton_gosht_mughlai", "name": "Gosht Mughlai", "price_ngn": 15000, "tags": ["indian", "mutton", "curry"] },
                        { "id": "ind_mutton_gosht_kadai", "name": "Gosht Kadai", "price_ngn": 15000, "tags": ["indian", "mutton", "curry"] },
                        { "id": "ind_mutton_bhuna_gosht", "name": "Bhuna Gosht", "price_ngn": 15000, "tags": ["indian", "mutton", "curry"] },
                        { "id": "ind_mutton_kheema_hyderabadi", "name": "Kheema Hyderabadi", "price_ngn": 15000, "tags": ["indian", "mutton", "curry"] },
                        { "id": "ind_mutton_gosht_roganjosh", "name": "Gosht Roganjosh", "price_ngn": 15000, "tags": ["indian", "mutton", "curry"], "featured": true, "imageUrl": "/images/menu/indian-menu-2.jpg" }
                    ]
                }
            ]
        },
        {
            "category": "Biryani & Rice",
            "items": [
                { "id": "biryani_chicken_or_chicken_tikka", "name": "Chicken / Chicken Tikka Biryani", "price_ngn": 14500, "tags": ["indian", "biryani"], "featured": true, "imageUrl": "/images/menu/indian-menu-1.jpg" },
                { "id": "biryani_mutton", "name": "Mutton Biryani", "price_ngn": 15500, "tags": ["indian", "biryani"] },
                { "id": "biryani_prawn", "name": "Prawn Biryani", "price_ngn": 19500, "tags": ["indian", "biryani", "seafood"] },
                { "id": "biryani_egg_or_veg", "name": "Egg / Veg Biryani", "price_ngn": 11000, "tags": ["indian", "biryani", "veg"] },
                { "id": "rice_jeera", "name": "Jeera Rice", "price_ngn": 7500, "tags": ["indian", "rice"] },
                { "id": "rice_boiled_basmati", "name": "Boiled Basmati Rice", "price_ngn": 7000, "tags": ["indian", "rice"] }
            ]
        },
        {
            "category": "Breads",
            "items": [
                { "id": "bread_plain_naan", "name": "Plain Naan", "price_ngn": 1700, "tags": ["bread"] },
                { "id": "bread_butter_naan", "name": "Butter Naan", "price_ngn": 1900, "tags": ["bread"] },
                { "id": "bread_garlic_naan", "name": "Garlic Naan", "price_ngn": 2100, "tags": ["bread"] },
                { "id": "bread_cheese_naan", "name": "Cheese Naan", "price_ngn": 5200, "tags": ["bread"] },
                { "id": "bread_cheese_chilli_garlic_naan", "name": "Cheese Chilli Garlic Naan", "price_ngn": 5200, "tags": ["bread"] },
                { "id": "bread_tandoori_roti", "name": "Tandoori Roti", "price_ngn": 1700, "tags": ["bread"] },
                { "id": "bread_masala_kulcha", "name": "Masala Kulcha", "price_ngn": 3000, "tags": ["bread"] }
            ]
        },
        {
            "category": "Accompaniments",
            "items": [
                { "id": "acc_cucumber_raita", "name": "Cucumber Raita", "price_ngn": 3500, "tags": ["accompaniment"] },
                { "id": "acc_onion_salad", "name": "Onion Salad", "price_ngn": 3500, "tags": ["accompaniment"] },
                { "id": "acc_fresh_green_salad", "name": "Fresh Green Salad", "price_ngn": 4000, "tags": ["accompaniment", "salad"] },
                { "id": "acc_peanut_masala", "name": "Peanut Masala", "price_ngn": 4000, "tags": ["accompaniment"] },
                { "id": "acc_plain_raita", "name": "Plain Raita", "price_ngn": 3500, "tags": ["accompaniment"] },
                { "id": "acc_masala_papad", "name": "Masala Papad", "price_ngn": 3000, "tags": ["accompaniment"] },
                { "id": "acc_plain_papad", "name": "Plain Papad", "price_ngn": 3000, "tags": ["accompaniment"] }
            ]
        },
        {
            "category": "Chinese Menu",
            "subcategories": [
                {
                    "subcategory": "Chicken",
                    "items": [
                        { "id": "chinese_chicken_black_bean", "name": "Chicken in Black Bean Sauce", "price_ngn": 17000, "tags": ["chinese", "chicken"] },
                        { "id": "chinese_diced_chicken_chilli", "name": "Diced Chicken in Chilli Sauce", "price_ngn": 17000, "tags": ["chinese", "chicken"] },
                        { "id": "chinese_diced_chicken_curry", "name": "Diced Chicken in Curry Sauce", "price_ngn": 17000, "tags": ["chinese", "chicken"] },
                        { "id": "chinese_chicken_hot_plate", "name": "Chicken Hot Plate", "price_ngn": 14000, "tags": ["chinese", "chicken"] },
                        { "id": "chinese_mongolian_chicken", "name": "Mongolian Chicken", "price_ngn": 14000, "tags": ["chinese", "chicken"] }
                    ]
                },
                {
                    "subcategory": "Prawns",
                    "items": [
                        { "id": "chinese_prawns_oyster_sauce", "name": "Prawns in Oyster Sauce", "price_ngn": 22000, "tags": ["chinese", "seafood", "prawns"] },
                        { "id": "chinese_prawns_hot_plate", "name": "Prawns in Hot Plate", "price_ngn": 25000, "tags": ["chinese", "seafood", "prawns"] }
                    ]
                }
            ]
        },
        {
            "category": "Continental Mains",
            "subcategories": [
                {
                    "subcategory": "Chicken",
                    "items": [
                        { "id": "cont_chicken_escalope", "name": "Chicken Escalope", "price_ngn": 18500, "tags": ["continental", "chicken"] },
                        { "id": "cont_chicken_red_curry_rice", "name": "Chicken Red Curry with Rice", "price_ngn": 18500, "tags": ["continental", "chicken"] },
                        { "id": "cont_grilled_chicken_chips_salad", "name": "Grilled Chicken & Chips with Salad", "price_ngn": 18500, "tags": ["continental", "chicken"] }
                    ]
                },
                {
                    "subcategory": "Lamb",
                    "items": [
                        { "id": "cont_slow_braised_lamb_jack_daniel", "name": "Slow Braised Lamb with Jack Daniel Sauce", "price_ngn": 28000, "tags": ["continental", "lamb"] },
                        { "id": "cont_lamb_chops_mashed_potatoes", "name": "Lamb Chops with Mashed Potatoes", "price_ngn": 32000, "tags": ["continental", "lamb"], "featured": true, "imageUrl": "/images/menu/grill-house-menu-2.jpg" }
                    ]
                },
                {
                    "subcategory": "Beef",
                    "items": [
                        { "id": "cont_beef_stroganoff_mashed_potatoes", "name": "Beef Stroganoff with Mashed Potatoes", "price_ngn": 24000, "tags": ["continental", "beef"] },
                        { "id": "cont_jack_daniels_steak_potatoes_veg", "name": "Jack Daniels Steak with Potatoes & Vegetables", "price_ngn": 24000, "tags": ["continental", "beef"] },
                        { "id": "cont_beef_steak_creamy_mushroom", "name": "Beef Steak with Creamy Mushroom Sauce", "price_ngn": 24000, "tags": ["continental", "beef"] }
                    ]
                },
                {
                    "subcategory": "Seafood",
                    "items": [
                        { "id": "cont_pan_fried_sole_fillet", "name": "Pan Fried Sole Fillet", "price_ngn": 23000, "tags": ["continental", "seafood", "fish"] },
                        { "id": "cont_beer_battered_fish_wedges", "name": "Beer Battered Fish with Potato Wedges", "price_ngn": 23000, "tags": ["continental", "seafood", "fish"] },
                        { "id": "cont_pan_fried_fish_fillet_coconut_rice", "name": "Pan Fried Fish Fillet with Coconut Rice", "price_ngn": 23000, "tags": ["continental", "seafood", "fish"] },
                        { "id": "cont_prawns_spicy_coconut_sauce_rice", "name": "Prawns in Spicy Coconut Sauce with Rice", "price_ngn": 23000, "tags": ["continental", "seafood", "prawns"] },
                        { "id": "cont_grilled_tiger_prawns", "name": "Grilled Tiger Prawns", "price_ngn": 32000, "tags": ["continental", "seafood", "prawns"] },
                        { "id": "cont_pineapple_rice_prawns", "name": "Pineapple Rice with Prawns", "price_ngn": 22000, "tags": ["continental", "seafood", "prawns"] }
                    ]
                }
            ]
        },
        {
            "category": "Subs & Wraps",
            "items": [
                { "id": "subs_philly_cheese_steak_sandwich", "name": "Philly Cheese Steak Sandwich", "price_ngn": 12000, "tags": ["sandwich"] },
                { "id": "subs_club_sandwich", "name": "Club Sandwich", "price_ngn": 12000, "tags": ["sandwich"] },
                { "id": "subs_assorted_shawarma", "name": "Assorted Shawarma", "price_ngn": 8000, "tags": ["shawarma"] },
                { "id": "subs_chicken_shawarma", "name": "Chicken Shawarma", "price_ngn": 8000, "tags": ["shawarma", "chicken"] },
                { "id": "subs_beef_shawarma", "name": "Beef Shawarma", "price_ngn": 8000, "tags": ["shawarma", "beef"] }
            ]
        },
        {
            "category": "Desserts",
            "items": [
                { "id": "dessert_brownie_ice_cream", "name": "Brownie with Ice Cream", "price_ngn": 12000, "tags": ["dessert"] },
                { "id": "dessert_blueberry_cheesecake", "name": "Blueberry Cheesecake", "price_ngn": 12000, "tags": ["dessert"] },
                { "id": "dessert_tiramisu", "name": "Tiramisu", "price_ngn": 12000, "tags": ["dessert"] }
            ]
        },
        {
            "category": "Special Platters",
            "items": [
                { "id": "platter_tamberma_special_mixed", "name": "Tamberma Special Mixed Platter", "price_ngn": 40000, "tags": ["platter"], "featured": true, "imageUrl": "/images/menu/Achari-Prawns.jpg" },
                { "id": "platter_chairman_mixed_kebab", "name": "Chairman Mixed Kebab Platter", "price_ngn": 30000, "tags": ["platter"] }
            ]
        }
    ],
    "meta": {
        "vat_rate_percent": 7.5,
        "vat_included_in_prices": false
    }
}

// Helper: Get all items flattened
export function getAllMenuItems(): MenuItem[] {
    const items: MenuItem[] = []

    for (const category of menuData.menu) {
        if (category.items) {
            items.push(...category.items)
        }
        if (category.subcategories) {
            for (const sub of category.subcategories) {
                items.push(...sub.items)
            }
        }
        if (category.plain_rice_options) {
            items.push(...category.plain_rice_options)
        }
    }

    return items
}

// Helper: Get featured items
export function getFeaturedItems(): MenuItem[] {
    return getAllMenuItems().filter(item => item.featured)
}

// Helper: Format price
export function formatPrice(price: number | null): string {
    if (price === null) return 'Price on request'
    return `₦${price.toLocaleString()}`
}

// Helper: Get category names
export function getCategoryNames(): string[] {
    return menuData.menu.map(cat => cat.category)
}
