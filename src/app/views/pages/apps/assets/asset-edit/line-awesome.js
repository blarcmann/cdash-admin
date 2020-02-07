const icons = [
  // 'la-rotate-90',
  // 'la-rotate-180',
  // 'la-rotate-270',
  // 'la-flip-horizontal',
  // 'la-flip-vertical',
  'la-hospital',
  'la-briefcase',
  'la-building',
  'la-burn',
  'la-bus',
  'la-car',
  'la-car-alt',
  'la-certificate',
  'la-motorcycle',
  'la-child',
  'la-phone',
  'la-city',
  'la-clinic-medical',
  'la-birthday-cake',
  // 'la-stack',
  // 'la-500px',
  // 'la-accessible-icon',
  // 'la-accusoft',
  // 'la-acquisitions-incorporated',
  'la-ad',
  'la-address-book',
  'la-address-card',
  'la-adjust',
  // 'la-adn',
  // 'la-adobe',
  // 'la-adversal',
  // 'la-affiliatetheme',
  'la-air-freshener',
  // 'la-airbnb',
  // 'la-alipay',
  'la-ambulance',
  'la-american-sign-language-interpreting',
  // 'la-amilia',
  'la-anchor',
  // 'la-android',
  'la-angle-double-down',
  'la-angle-down',
  'la-angry',
  // 'la-angrycreative',
  'la-ankh',
  // 'la-app-store',
  // 'la-app-store-ios',
  // 'la-apple',
  // 'la-apper',
  'la-archive',
  'la-archway',
  'la-arrow-alt-circle-up',
  'la-arrow-alt-circle-down',
  'la-arrow-circle-left',
  'la-arrow-down',
  'la-arrows-alt',
  'la-arrows-alt-h',
  'la-arrows-alt-v',
  // 'la-artstation',
  'la-assistive-listening-systems',
  'la-asterisk',
  // 'la-asymmetrik',
  'la-at',
  'la-atlas',
  // 'la-atlassian',
  'la-atom',
  // 'la-audible',
  'la-audio-description',
  // 'la-avianex',
  // 'la-aviato',
  'la-award',
  'la-baby-carriage',
  'la-bacon',
  // 'la-ban',
  // 'la-bandcamp',
  'la-battery-empty',
  // 'la-battery-full',
  // 'la-battle-net',
  'la-beer',
  'la-bezier-curve',
  'la-bible',
  // 'la-bimobject',
  'la-binoculars',
  // 'la-bitcoin',
  // 'la-bity',
  'la-bolt',
  'la-book-medical',
  'la-bookmark',
  'la-bowling-ball',
  'la-box',
  'la-braille',
  'la-calendar',
  'la-camera',
  'la-cannabis',
  'la-caret-up',
  'la-cart-plus',
  // 'la-cc-amex',
  // 'la-cc-jcb',
  // 'la-cc-mastercard',
  // 'la-cc-paypal',
  // 'la-cc-stripe',
  // 'la-cc-visa',
  'la-charging-station',
  'la-chart-bar',
  'la-cheese',
  'la-chevron-circle-down',
  'la-closed-captioning',
  'la-cloud',
  'la-cloud-upload-alt',
  // 'la-cloudscale',
  'la-cocktail',
  'la-code',
  'la-coffee',
  // 'la-codiepie',
  'la-cookie-bite',
  // 'la-cotton-bureau',
  'la-couch',
  // 'la-creative-commons-by',
  'la-crutch',
  'la-cube',
  // 'la-cuttlefish',
  // 'la-delicious',
  // 'la-deskpro',
  'la-dharmachakra',
  // 'la-dhl',
  'la-digital-tachograph',
  'la-dna',
  'la-donate',
  'la-download',
  // 'la-draft2digital',
  'la-dumbbell',
  // 'la-earlybirds',
  // 'la-ebay',
  'la-eject',
  // 'la-empire',
  'la-envelope',
  // 'la-erlang',
  // 'la-ethereum',
  'la-ethernet',
  // 'la-expeditedssl',
  // 'la-facebook',
  'la-fan',
  'la-fax',
  'la-feather',
  // 'la-fedora',
  'la-fighter-jet',
  'la-file-audio',
  'la-file-image',
  'la-file-medical',
  'la-file-prescription',
  'la-film',
  'la-first-aid',
  'la-flag',
  'la-football-ball',
  'la-gamepad',
  // 'la-gg-circle',
  // 'la-gg',
  'la-gifts',
  // 'la-gitkraken',
  'la-glass-cheers',
  // 'la-google-drive',
  'la-graduation-cap',
  'la-grin-stars',
  'la-grip-lines',
  'la-guitar',
  'la-hamburger',
  'la-hands-helping',
  'la-haykal',
  'la-hdd',
  'la-headphones',
  'la-headset',
  'la-heartbeat',
  'la-helicopter',
  'la-horse',
  'la-hotel',
  'la-hourglass',
  'la-hryvnia',
  'la-i-cursor',
  'la-id-badge',
  'la-id-card',
  'la-image',
  'la-industry',
  // 'la-intercom',
  // 'la-ioxhost',
  // 'la-itunes',
  // 'la-jira',
  'la-journal-whills',
  // 'la-js',
  // 'la-js-square',
  'la-key',
  // 'la-keycdn',
  'la-khanda',
  // 'la-kickstarter-k',
  'la-kiss',
  // 'la-korvue',
  'la-laptop',
  // 'la-lastfm',
  'la-leaf',
  // 'la-leanpub',
  'la-lemon',
  'la-life-ring',
  'la-lightbulb',
  // 'la-linux',
  'la-location-arrow',
  'la-luggage-cart',
  'la-mail-bulk',
  // 'la-mailchimp',
  // 'la-mandalorian',
  'la-map',
  'la-map-marked',
  // 'la-markdown',
  'la-mask',
  'la-medal',
  'la-medkit',
  // 'la-megaport',
  'la-meh',
  'la-meh-blank',
  'la-memory',
  'la-mercury',
  'la-microchip',
  'la-microphone',
  'la-microscope',
  'la-mitten',
  // 'la-mizuni',
  // 'la-monero',
  'la-money-bill',
  'la-monument',
  'la-mosque',
  'la-mouse',
  'la-network-wired',
  'la-neuter',
  // 'la-nimblr',
  // 'la-nutritionix',
  // 'la-odnoklassniki',
  // 'la-orcid',
  'la-outdent',
  'la-paint-brush',
  // 'la-palfed',
  'la-paperclip',
  'la-parking',
  'la-pastafarianism',
  // 'la-paypal',
  // 'la-penny-arcade',
  // 'la-periscope',
  // 'la-pied-piper',
  // 'la-pinterest',
  'la-pizza-slice',
  'la-plane',
  // 'la-playstation',
  'la-plug',
  'la-poll',
  'la-poo',
  'la-pound-sign',
  'la-portrait',
  'la-puzzle-piece',
  'la-qrcode',
  'la-quidditch',
  // 'la-r-project',
  'la-radiation',
  // 'la-raspberry-pi',
  'la-record-vinyl',
  'la-reply-all',
  // 'la-researchgate',
  'la-retweet',
  'la-ring',
  'la-robot',
  'la-rss',
  'la-running',
  // 'la-sass',
  // 'la-schlix',
  'la-search-dollar',
  'la-server',
  // 'la-servicestack',
  'la-share',
  'la-shekel-sign',
  'la-ship',
  'la-shopping-bag',
  'la-shopping-cart',
  'la-shuttle-van',
  'la-sign-language',
  // 'la-sistrix',
  'la-skiing',
  // 'la-skype',
  // 'la-slack',
  'la-sleigh',
  'la-smog',
  'la-sms',
  'la-solar-panel',
  'la-sort',
  // 'la-soundcloud',
  'la-spa',
  'la-spinner',
  'la-spray-can',
  // 'la-stackpath',
  'la-star',
  'la-stamp',
  // 'la-staylinked',
  // 'la-steam-symbol',
  // 'la-sticker-mule',
  'la-stopwatch',
  // 'la-strava',
  // 'la-stripe',
  // 'la-studiovinari',
  // 'la-stumbleupon',
  'la-subway',
  'la-suitcase-rolling',
  'la-superscript',
  // 'la-suse',
  'la-swatchbook',
  'la-swimming-pool',
  // 'la-symfony',
  'la-synagogue',
  'la-syringe',
  'la-tablet',
  'la-tape',
  // 'la-teamspeak',
  // 'la-telegram',
  // 'la-tencent-weibo',
  'la-terminal',
  'la-th',
  // 'la-themeco',
  'la-thermometer',
  // 'la-think-peaks',
  'la-ticket-alt',
  'la-tint',
  'la-toolbox',
  'la-traffic-light',
  'la-trademark',
  'la-trash',
  'la-tree',
  'la-truck',
  'la-tshirt',
  'la-tty',
  'la-tv',
  // 'la-uber',
  'la-umbrella',
  'la-universal-access',
  'la-unlock',
  // 'la-usb',
  'la-user-cog',
  'la-user-friends',
  'la-user-ninja',
  'la-user-secret',
  'la-user-tie',
  // 'la-ussunnah',
  // 'la-usps',
  // 'la-vaadin',
  'la-vial',
  // 'la-viber',
  'la-wheelchair',
  'la-wifi',
  'la-window-close',
  // 'la-wolf-pack-battalion',
  'la-wrench',
  // 'la-zhihu'
]

export default icons;