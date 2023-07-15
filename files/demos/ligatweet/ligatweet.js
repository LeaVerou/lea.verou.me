/**
 * Script for tweet shortening using unicode ligatures and other compound symbols
 * @author Lea Verou
 * @version 1.0
 * @license Licensed under the MIT license http://www.opensource.org/licenses/mit-license.php
 */

var ligatures = [
	// From most discreet to most noticeable, from more characters to less characters
	[{
		'viii': '2177'
	}, {
		'\\.\\.\\.': '0085',
		'\\b1/3\\b': '2153',
		'\\b2/3\\b': '2154',
		'\\b1/8\\b': '215B',
		'\\b3/8\\b': '215C',
		'\\b5/8\\b': '215D',
		'\\b7/8\\b': '215E',
		'iii': '2172',
		'vii': '2176',
		'xii': '217B',
		'<=>': '21D4',
		'10\\.': '2491',
		'11\\.': '2492',
		'12\\.': '2493',
		'13\\.': '2494',
		'14\\.': '2495',
		'15\\.': '2496',
		'16\\.': '2497',
		'17\\.': '2498',
		'18\\.': '2499',
		'19\\.': '249a',
		'20\\.': '249b',
		'ffi': 'FB03',
		'ffl': 'FB04'
	}, {
		'--': '0097',
		'AE': '00C6', 'ae': '00E6',
		'oe': '009C', 'OE': '0152',
		'IJ': '0132', 'ij': '0133',
		"L'": '013D',
		"I'": '013E',
		'LJ': '01c7', 'Lj': '01c8', 'lj': '01c9',
		'NJ': '01ca', 'Nj': '01cb', 'nj': '01cc',
		'DZ': '01f1', 'Dz': '01f2', 'dz': '01f3',
		'ts': '02A6',
		'tf': '02A7',
		'tc': '02A8',
		'fn': '02A9',
		'ls': '02Aa',
		'lz': '02Ab',
		'Hb': '040A',
		'bl': '042B',
		'IO': '042E',
		'io': '044E',
		'Oy': '0478',
		'oy': '0479',
		'ue': '1D6B',
		'll': '2016', // or 0965?
		'!!': '203C',
		'\\?\\?': '2047',
		'\\?!': '2048',
		'!\\?': '2049',
		'Rs': '20A8',
		'tb': '2114',
		'ii': '2171',
		'iv': '2173',
		'vi': '2175',
		'ix': '2178',
		'xi': '217A',
		'<-': '2190', '->': '2192',
		'=>': '21D2',
		'<<': '226A', '>>': '226B',
		'1\\.': '2488',
		'2\\.': '2489',
		'3\\.': '248a',
		'4\\.': '248b',
		'5\\.': '248c',
		'6\\.': '248d',
		'7\\.': '248e',
		'8\\.': '248f',
		'9\\.': '2490',
		'ff': 'FB00',
		'fi': 'FB01',
		'fl': 'FB02',
		'ft': 'FB05',
		'st': 'FB06',
		' !': 'FE15',
		' \\?': 'FE16'
	}],
	[{
		'\\b1/5\\b': '2155',
		'\\b2/5\\b': '2156',
		'\\b3/5\\b': '2157',
		'\\b4/5\\b': '2158',
		'\\b1/6\\b': '2159',
		'\\b5/6\\b': '215A',
		'VIII': '2166',
		'kcal': '3389',
		'a\\.m\\.': '33C2',
		'K\\.K\\.': '33CD',
		'p\\.m\\.': '33D8'
	}, {
		'\\b1/4\\b': '00BC',
		'\\b1/2\\b': '00BD',
		'\\b3/4\\b': '00BE',
		'Pts': '20A7',
		'TEL': '2121',
		//'FAX': '213B', //unsupported by IE, Chrome
		'\\b1/3\\b': '2153',
		'\\b2/3\\b': '2154',
		'\\b1/5\\b': '2155',
		'\\b2/5\\b': '2156',
		'\\b3/5\\b': '2157',
		'\\b4/5\\b': '2158',
		'\\b1/6\\b': '2159',
		'\\b5/6\\b': '215A',
		'\\b1/8\\b': '215B',
		'\\b3/8\\b': '215C',
		'\\b5/8\\b': '215D',
		'\\b7/8\\b': '215E',
		'III': '2162',
		'VII': '2166',
		'XII': '216B',
		'hPa': '3371',
		'bar': '3374',
		'cal': '3388',
		'kHz': '3391', 'MHz': '3392', 'GHz': '3393', 'THz': '3394',
		'kPa': '33AA', 'MPa': '33AB', 'GPa': '33AC',
		'rad': '33AD',
		'Co\\.': '33C7',
		'log': '33D2',
		'mil': '33D5',
		'mol': '33D6',
		'PPM': '33D9'
	}, {
		'hu': '0195',
		'Hu': '01f6',
		'd3': '02A4',
		'IE': '0464',
		'ie': '0465',
		'du': '0502',
		'un': '057F',
		//'tt': '07DA', //unsupported by Chrome
		'oc': '1142',
		//'oo': '1147', // Bad hinting
		'oi': '13BA',
		'oo': '13C7',
		'II': '2161',
		'IV': '2163',
		'VI': '2165',
		'IX': '2168',
		'XI': '216A',
		'CD': '2180',
		//'\\.\\.': '28C0', //unsupported by IE,Chrome
		'XX': '3037',
		'da': '3372',
		'AU': '3373',
		'oV': '3375',
		'pc': '3376',
		'nA': '3381', 'mA': '3383', 'kA': '3384',
		'KB': '3385', 'MB': '3386', 'GB': '3387',
		'pF': '338A', 'nF': '338B',
		'mg': '338E', 'kg': '338F',
		'Hz': '3390',
		'ml': '3396', 'kl': '3398',
		'fm': '3399',
		'nm': '339A', 'mm': '339C', 'cm': '339D', 'km': '339E',
		'Pa': '33A9',
		'ps': '33B0', 'ns': '33B1', 'ms': '33B3',
		'pV': '33B4', 'nV': '33B5', 'mV': '33B7', 'kV': '33B8', 'MV': '33B9',
		'pW': '33BA', 'nW': '33BB', 'mW': '33BD', 'kW': '33BE', 'MW': '33BF',
		'Bq': '33C3',
		'cc': '33C4',
		'cd': '33C5',
		'dB': '33C8',
		'Gy': '33C9',
		'ha': '33CA',
		'HP': '33CB',
		'in': '33CC',
		'KM': '33CE',
		'kt': '33CF',
		'lm': '33D0',
		'ln': '33D1',
		'lx': '33D3',
		'mb': '33D4',
		'pH': '33D7',
		'PR': '33DA',
		'sr': '33DB',
		'Sv': '33DC',
		'Wb': '33DD'
	}]
];

// The DOM-agnostic function that utilizes them
function ligatweetize(tweet, goal, insensitive) {
	if(!tweet) {
		return '';
	}

	// Set defaults
	goal = goal || 140;

	var ligatweet = tweet,
		regFlag = 'g' + (insensitive? 'i' : ''),
		// Extract links, #hashtags and @usernames, so that they remain intact
		intactRegex = /(@\S*|#\S*|http:\/\/\S+)/g,
		intactArray = ligatweet.match(intactRegex) || [];

	// An @# is definietely not present in the rest of the tweet (even if it was, we kept it in intactArray)
	ligatweet = ligatweet.replace(intactRegex, '@#');

	// How many characters were removed?
	var removed = tweet.length - ligatweet.length + 2*intactArray.length;

	outerloop: for(var i=0; i<ligatures.length; i++) {
		for(var j=0; j<ligatures[i].length; j++) {
			for(var combo in ligatures[i][j]) {
				// Why not join all needles into 1 regex? Because then we can't have the 'i' flag (how will we find the replacement??)
				ligatweet = ligatweet.replace(new RegExp(combo, regFlag), '&#x' + ligatures[i][j][combo] + ';')

				if(ligatweet.length - 2*intactArray.length + removed <= goal) {
					break outerloop;
				}
			}
		}
	}

	// Replace @#s with the corresponding @usernames, #hashtags and links we removed previously
	ligatweet = ligatweet.replace(/@#/g, function(){ return intactArray.shift(); });

	return ligatweet;
}
