import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';
import { MediaDashboardComponent } from '../dashboards/media-dashboard/media-dashboard.component';
import { keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class HighchartsConfigService {
  parseMapData(
    apiData: any,
    parent: MediaDashboardComponent
  ): Highcharts.Options {
    let countryCountMap: any = {};
    let data = apiData;
    for (let i = 0; i < data.length; i++) {
      if (
        parent.currentFilters['rating'] &&
        data[i].rating !== parent.currentFilters['rating']
      ) {
        continue;
      }
      let countries = data[i]['country'].split(',');
      for (let j = 0; j < countries.length; j++) {
        let country = countries[j].trim();
        if (countryCountMap[countryCodeMap[country]]) {
          countryCountMap[countryCodeMap[country]]++;
        } else {
          countryCountMap[countryCodeMap[country]] = 1;
        }
      }
    }
    let final: any = [];
    Object.keys(countryCountMap).forEach((country) => {
      if (country !== 'undefined')
        final.push([country, countryCountMap[country]]);
    });
    return {
      accessibility: {
        enabled: false,
      },
      chart: {
        map: worldMap,
        events: {
          load: function () {
            const self = this;
            setTimeout(() => {
              self.reflow();
            }, 5);
          },
        },
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: 'spacingBox',
        },
      },
      title: {
        text: '',
      },
      legend: {
        enabled: true,
      },
      colorAxis: {
        min: 0,
        max: 100,
      },
      series: [
        {
          type: 'map',
          name: 'Number of ' + parent.type,
          allowPointSelect: true,
          states: {
            hover: {
              color: '#BADA55',
            },
          },
          dataLabels: {
            enabled: false,
            format: '{point.name}',
          },
          allAreas: false,
          data: final,
          point: {
            events: {
              select: (e) => {
                parent.applyFilter(e, 'country',"map");
              },
              unselect: (e) => {
                parent.removeFilter('country',"map");
              },
            },
          },
        },
      ],
      credits: {
        enabled: false,
      },
    };
  }

  parsePieData(
    apiData: any,
    parent: MediaDashboardComponent
  ): Highcharts.Options {
    let ratingMap: any = {};
    let final: any = [];

    for (let i = 0; i < apiData.length; i++) {
      if (
        parent.currentFilters['country'] &&
        !apiData[i]['country'].includes(parent.currentFilters['country'])
      ) {
        continue;
      }
      if (ratingMap[apiData[i]['rating']]) {
        ratingMap[apiData[i]['rating']]++;
      } else {
        ratingMap[apiData[i]['rating']] = 1;
      }
    }

    Object.keys(ratingMap).forEach((rating) => {
      final.push({
        name: rating,
        y: ratingMap[rating],
      });
    });

    return {
      chart: {
        plotBackgroundColor: undefined,
        plotBorderWidth: undefined,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: '',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          animation: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
          },
          showInLegend: false,
        },
      },
      series: [
        {
          name: 'Ratings',
          type: 'pie',
          colorByPoint: true,
          data: final,
          point: {
            events: {
              select: (e) => {
                parent.applyFilter(e, 'rating',"pie");
              },
              unselect: (e) => {
                parent.removeFilter('rating',"pie");
              },
            },
          },
        },
      ],
      credits: {
        enabled: false,
      },
    };
  }
  constructor() {}
}
var countryCodeMap: any = {
  Afghanistan: 'af',
  'Aland Islands': 'ax',
  Albania: 'al',
  Algeria: 'dz',
  'American Samoa': 'as',
  Andorra: 'ad',
  Angola: 'ao',
  Anguilla: 'ai',
  Antarctica: 'aq',
  'Antigua And Barbuda': 'ag',
  Argentina: 'ar',
  Armenia: 'am',
  Aruba: 'aw',
  Australia: 'au',
  Austria: 'at',
  Azerbaijan: 'az',
  Bahamas: 'bs',
  Bahrain: 'bh',
  Bangladesh: 'bd',
  Barbados: 'bb',
  Belarus: 'by',
  Belgium: 'be',
  Belize: 'bz',
  Benin: 'bj',
  Bermuda: 'bm',
  Bhutan: 'bt',
  Bolivia: 'bo',
  'Bosnia And Herzegovina': 'ba',
  Botswana: 'bw',
  'Bouvet Island': 'bv',
  Brazil: 'br',
  'British Indian Ocean Territory': 'io',
  'Brunei Darussalam': 'bn',
  Bulgaria: 'bg',
  'Burkina Faso': 'bf',
  Burundi: 'bi',
  Cambodia: 'kh',
  Cameroon: 'cm',
  Canada: 'ca',
  'Cape Verde': 'cv',
  'Cayman Islands': 'ky',
  'Central African Republic': 'cf',
  Chad: 'td',
  Chile: 'cl',
  China: 'cn',
  'Christmas Island': 'cx',
  'Cocos (Keeling) Islands': 'cc',
  Colombia: 'co',
  Comoros: 'km',
  Congo: 'cg',
  'Congo, Democratic Republic': 'cd',
  'Cook Islands': 'ck',
  'Costa Rica': 'cr',
  'Cote D"Ivoire': 'ci',
  Croatia: 'hr',
  Cuba: 'cu',
  Cyprus: 'cy',
  'Czech Republic': 'cz',
  Denmark: 'dk',
  Djibouti: 'dj',
  Dominica: 'dm',
  'Dominican Republic': 'do',
  Ecuador: 'ec',
  Egypt: 'eg',
  'El Salvador': 'sv',
  'Equatorial Guinea': 'gq',
  Eritrea: 'er',
  Estonia: 'ee',
  Ethiopia: 'et',
  'Falkland Islands (Malvinas)': 'fk',
  'Faroe Islands': 'fo',
  Fiji: 'fj',
  Finland: 'fi',
  France: 'fr',
  'French Guiana': 'gf',
  'French Polynesia': 'pf',
  'French Southern Territories': 'tf',
  Gabon: 'ga',
  Gambia: 'gm',
  Georgia: 'ge',
  Germany: 'de',
  Ghana: 'gh',
  Gibraltar: 'gi',
  Greece: 'gr',
  Greenland: 'gl',
  Grenada: 'gd',
  Guadeloupe: 'gp',
  Guam: 'gu',
  Guatemala: 'gt',
  Guernsey: 'gg',
  Guinea: 'gn',
  'Guinea-Bissau': 'gw',
  Guyana: 'gy',
  Haiti: 'ht',
  'Heard Island & Mcdonald Islands': 'hm',
  'Holy See (Vatican City State)': 'va',
  Honduras: 'hn',
  'Hong Kong': 'hk',
  Hungary: 'hu',
  Iceland: 'is',
  India: 'in',
  Indonesia: 'id',
  'Iran, Islamic Republic Of': 'ir',
  Iraq: 'iq',
  Ireland: 'ie',
  'Isle Of Man': 'im',
  Israel: 'il',
  Italy: 'it',
  Jamaica: 'jm',
  Japan: 'jp',
  Jersey: 'je',
  Jordan: 'jo',
  Kazakhstan: 'kz',
  Kenya: 'ke',
  Kiribati: 'ki',
  Korea: 'kr',
  'South Korea': 'kr',
  'North Korea': 'kp',
  Kuwait: 'kw',
  Kyrgyzstan: 'kg',
  'Lao People"s Democratic Republic': 'la',
  Latvia: 'lv',
  Lebanon: 'lb',
  Lesotho: 'ls',
  Liberia: 'lr',
  'Libyan Arab Jamahiriya': 'ly',
  Liechtenstein: 'li',
  Lithuania: 'lt',
  Luxembourg: 'lu',
  Macao: 'mo',
  Macedonia: 'mk',
  Madagascar: 'mg',
  Malawi: 'mw',
  Malaysia: 'my',
  Maldives: 'mv',
  Mali: 'ml',
  Malta: 'mt',
  'Marshall Islands': 'mh',
  Martinique: 'mq',
  Mauritania: 'mr',
  Mauritius: 'mu',
  Mayotte: 'yt',
  Mexico: 'mx',
  'Micronesia, Federated States Of': 'fm',
  Moldova: 'md',
  Monaco: 'mc',
  Mongolia: 'mn',
  Montenegro: 'me',
  Montserrat: 'ms',
  Morocco: 'ma',
  Mozambique: 'mz',
  Myanmar: 'mm',
  Namibia: 'na',
  Nauru: 'nr',
  Nepal: 'np',
  Netherlands: 'nl',
  'Netherlands Antilles': 'an',
  'New Caledonia': 'nc',
  'New Zealand': 'nz',
  Nicaragua: 'ni',
  Niger: 'ne',
  Nigeria: 'ng',
  Niue: 'nu',
  'Norfolk Island': 'nf',
  'Northern Mariana Islands': 'mp',
  Norway: 'no',
  Oman: 'om',
  Pakistan: 'pk',
  Palau: 'pw',
  'Palestinian Territory, Occupied': 'ps',
  Panama: 'pa',
  'Papua New Guinea': 'pg',
  Paraguay: 'py',
  Peru: 'pe',
  Philippines: 'ph',
  Pitcairn: 'pn',
  Poland: 'pl',
  Portugal: 'pt',
  'Puerto Rico': 'pr',
  Qatar: 'qa',
  Reunion: 're',
  Romania: 'ro',
  'Russian Federation': 'ru',
  Russia: 'ru',
  Rwanda: 'rw',
  'Saint Barthelemy': 'bl',
  'Saint Helena': 'sh',
  'Saint Kitts And Nevis': 'kn',
  'Saint Lucia': 'lc',
  'Saint Martin': 'mf',
  'Saint Pierre And Miquelon': 'pm',
  'Saint Vincent And Grenadines': 'vc',
  Samoa: 'ws',
  'San Marino': 'sm',
  'Sao Tome And Principe': 'st',
  'Saudi Arabia': 'sa',
  Senegal: 'sn',
  Serbia: 'rs',
  Seychelles: 'sc',
  'Sierra Leone': 'sl',
  Singapore: 'sg',
  Slovakia: 'sk',
  Slovenia: 'si',
  'Solomon Islands': 'sb',
  Somalia: 'so',
  'South Africa': 'za',
  'South Georgia And Sandwich Isl.': 'gs',
  Spain: 'es',
  'Sri Lanka': 'lk',
  Sudan: 'sd',
  Suriname: 'sr',
  'Svalbard And Jan Mayen': 'sj',
  Swaziland: 'sz',
  Sweden: 'se',
  Switzerland: 'ch',
  'Syrian Arab Republic': 'sy',
  Taiwan: 'tw',
  Tajikistan: 'tj',
  Tanzania: 'tz',
  Thailand: 'th',
  'Timor-Leste': 'tl',
  Togo: 'tg',
  Tokelau: 'tk',
  Tonga: 'to',
  'Trinidad And Tobago': 'tt',
  Tunisia: 'tn',
  Turkey: 'tr',
  Turkmenistan: 'tm',
  'Turks And Caicos Islands': 'tc',
  Tuvalu: 'tv',
  Uganda: 'ug',
  Ukraine: 'ua',
  'United Arab Emirates': 'ae',
  'United Kingdom': 'gb',
  'United States': 'us',
  'United States of America': 'us',
  'United States Outlying Islands': 'um',
  Uruguay: 'uy',
  Uzbekistan: 'uz',
  Vanuatu: 'vu',
  Venezuela: 've',
  Vietnam: 'vn',
  'Virgin Islands, British': 'vg',
  'Virgin Islands, U.S.': 'vi',
  'Wallis And Futuna': 'wf',
  'Western Sahara': 'eh',
  Yemen: 'ye',
  Zambia: 'zm',
  Zimbabwe: 'zw',
};
