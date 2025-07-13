import { GovernmentService, SupportedLanguage } from '@/lib/types';

export const GOVERNMENT_SERVICES: GovernmentService[] = [
  {
    id: 'passport',
    name: 'Passport Application',
    description: 'Apply for Nigerian international passport - Standard, Official, or Diplomatic',
    category: 'Immigration',
    requirements: [
      'Valid National ID card (NIN)',
      'Birth certificate or declaration of age',
      'Passport photographs (2 copies, white background)',
      'Application fee receipt',
      'Completed application form',
      'Marriage certificate (if applicable)',
      'Letter of consent (for minors)',
      'Police report (for lost/stolen passports)'
    ],
    process_steps: [
      'Visit the Nigeria Immigration Service (NIS) website: https://immigration.gov.ng',
      'Complete online application form',
      'Upload required documents',
      'Pay application fee online (₦25,000 for 32 pages, ₦35,000 for 64 pages)',
      'Schedule biometric capture appointment',
      'Visit designated NIS office for biometric capture',
      'Submit original documents for verification',
      'Wait for processing (6-8 weeks for new applications, 3-4 weeks for renewals)',
      'Collect passport at designated office or via courier'
    ],
    estimated_time: '6-8 weeks (new), 3-4 weeks (renewal)',
    cost: '₦25,000 (32 pages), ₦35,000 (64 pages), ₦70,000 (Diplomatic)',
    office_locations: ['Lagos', 'Abuja', 'Kano', 'Port Harcourt', 'Enugu', 'Kaduna', 'Ibadan', 'Calabar'],
    translations: {
      en: {
        name: 'Passport Application',
        description: 'Apply for Nigerian international passport - Standard, Official, or Diplomatic',
        requirements: [
          'Valid National ID card (NIN)',
          'Birth certificate or declaration of age',
          'Passport photographs (2 copies, white background)',
          'Application fee receipt',
          'Completed application form',
          'Marriage certificate (if applicable)',
          'Letter of consent (for minors)',
          'Police report (for lost/stolen passports)'
        ],
        process_steps: [
          'Visit the Nigeria Immigration Service (NIS) website: https://immigration.gov.ng',
          'Complete online application form',
          'Upload required documents',
          'Pay application fee online (₦25,000 for 32 pages, ₦35,000 for 64 pages)',
          'Schedule biometric capture appointment',
          'Visit designated NIS office for biometric capture',
          'Submit original documents for verification',
          'Wait for processing (6-8 weeks for new applications, 3-4 weeks for renewals)',
          'Collect passport at designated office or via courier'
        ]
      },
      yo: {
        name: 'Iwe Iwoleka',
        description: 'Beere fun iwe iwoleka orilẹ-ede Naijiria - Iṣaaju, Iṣẹ, tabi Aṣoju',
        requirements: [
          'Kaadi idanimọ to wulo (NIN)',
          'Iwe ẹri ibimo tabi iṣọri ọjọ ori',
          'Awọn fọto iwe iwoleka (eeya meji, aṣọ funfun)',
          'Risiti owo sisanwo',
          'Fọọmu ibeere ti o pari',
          'Iwe ẹri igbeyawo (ti o ba wulo)',
          'Lẹta idaamu (fun awọn ọmọde)',
          'Iwe ẹri ọlọpa (fun awọn iwe iwoleka ti o ṣe gbagbe/ti a jẹ)'
        ],
        process_steps: [
          'Lo si ayelujara Nigeria Immigration Service (NIS): https://immigration.gov.ng',
          'Pari fọọmu ibeere lori ayelujara',
          'Gbe awọn iwe pataki soke',
          'San owo ibeere lori ayelujara (₦25,000 fun oju ewe 32, ₦35,000 fun oju ewe 64)',
          'Ṣe apẹẹrẹ ibi ipade ami-ara',
          'Lo si ọfiisi NIS ti a yan fun gbigba ami-ara',
          'Fi awọn iwe oriṣiriṣi silẹ fun idaniloju',
          'Duro fun iṣẹ-ṣiṣe (ọsẹ 6-8 fun awọn ibeere tuntun, ọsẹ 3-4 fun awọn tunṣe)',
          'Gba iwe iwoleka ni ọfiisi ti a yan tabi nipasẹ olugbe'
        ]
      },
      ha: {
        name: 'Neman Fasfo',
        description: 'Neman fasfo na duniya na Najeriya - Na yau da kullun, Na aiki, ko Na diflomasiyya',
        requirements: [
          'Katin shedar mai amfani (NIN)',
          'Takaddun haihuwa ko bayanin shekaru',
          'Hotunan fasfo (kwafi 2, bangon fari)',
          'Rasidin biyan kudin neman',
          'Fom na neman da aka kammala',
          'Takaddar aure (idan ya dace)',
          'Takarda yarda (ga yara)',
          'Rahoton yan sanda ga fasfo da aka bata/da aka sace',
        ],
        process_steps: [
          'Ziyartar gidan yanar gizo na Nigeria Immigration Service (NIS): https://immigration.gov.ng',
          'Kammala fom na neman ta yanar gizo',
          'Saka takaddun da ake bukata',
          'Biya kudin neman ta yanar gizo (₦25,000 don shafi 32, ₦35,000 don shafi 64)',
          'Shirya lokacin daukar hoto da yatsa',
          'Ziyartar ofishin NIS da aka zaɓa don daukar hoto da yatsa',
          'Mika takaddun asali don tabbatarwa',
          'Jira sarrafa (makonni 6-8 ga neman sabo, makonni 3-4 ga sabuntawa)',
          'Karbi fasfo a ofishin da aka zaɓa ko ta mai aikawa'
        ]
      },
      ig: {
        name: 'Ngwa Passport',
        description: 'Rịọ maka passport mba ụwa nke Naịjịrịa - Ọkọlọtọ, Ọrụ, ma ọ bụ Diplomatic',
        requirements: [
          'Kaadị njirimara bara uru (NIN)',
          'Akwụkwọ ọmụmụ ma ọ bụ nkwupụta afọ',
          'Foto passport (2 copy, okirikiri ọcha)',
          'Akwụkwọ ịkwụ ụgwọ ngwa',
          'Mpempe akwụkwọ ngwa zuru okè',
          'Asambodo alụmdi na nwunye (ọ bụrụ na ọ dị)',
          'Akwụkwọ nkwenye (maka ụmụaka)',
          'Akụkọ ndị uwe ojii (maka passport furu efu/ezuru)'
        ],
        process_steps: [
          'Gaa na weebụsaịtị Nigeria Immigration Service (NIS): https://immigration.gov.ng',
          'Dejupụta mpempe akwụkwọ ngwa nịntanetị',
          'Bulite akwụkwọ achọrọ',
          'Kwụọ ụgwọ ngwa nịntanetị (₦25,000 maka peeji 32, ₦35,000 maka peeji 64)',
          'Hazie oge ịnweta biometric',
          'Gaa nụlọ ọrụ NIS ahọpụtara maka ịnweta biometric',
          'Chebata akwụkwọ mbụ maka nkwenye',
          'Chere maka nhazi (izu 6-8 maka ngwa ọhụrụ, izu 3-4 maka mmegharị)',
          'Nweta passport nụlọ ọrụ ahọpụtara ma ọ bụ site na courier'
        ]
      }
    }
  },
  {
    id: 'nin_registration',
    name: 'National ID Card (NIN) Registration',
    description: 'Register for National Identification Number (NIN) and obtain National ID card',
    category: 'Identity',
    requirements: [
      'Birth certificate or declaration of age',
      'Valid passport (if available)',
      'Driver\'s license (if available)',
      'Voter\'s card (if available)',
      'Local government identification letter',
      'Two recent passport photographs',
      'Completed NIN enrollment form'
    ],
    process_steps: [
      'Visit any NIMC enrollment center nationwide',
      'Obtain and complete NIN enrollment form',
      'Submit required documents for verification',
      'Undergo biometric capture (fingerprints, facial image)',
      'Receive NIN slip immediately',
      'Wait for National ID card (3-6 months)',
      'Collect ID card at enrollment center or via courier'
    ],
    estimated_time: 'Same day (NIN), 3-6 months (ID card)',
    cost: 'Free (NIN registration), ₦1,000 (ID card replacement)',
    office_locations: ['All state capitals', 'Major local government areas', 'NIMC offices nationwide'],
    translations: {
      en: {
        name: 'National ID Card (NIN) Registration',
        description: 'Register for National Identification Number (NIN) and obtain National ID card',
        requirements: [
          'Birth certificate or declaration of age',
          'Valid passport (if available)',
          'Driver\'s license (if available)',
          'Voter\'s card (if available)',
          'Local government identification letter',
          'Two recent passport photographs',
          'Completed NIN enrollment form'
        ],
        process_steps: [
          'Visit any NIMC enrollment center nationwide',
          'Obtain and complete NIN enrollment form',
          'Submit required documents for verification',
          'Undergo biometric capture (fingerprints, facial image)',
          'Receive NIN slip immediately',
          'Wait for National ID card (3-6 months)',
          'Collect ID card at enrollment center or via courier'
        ]
      },
      yo: {
        name: 'Iwe ẹri Idanimọ Orilẹ-ede (NIN) Iforukọsilẹ',
        description: 'Forukọsilẹ fun Nọmba Idanimọ Orilẹ-ede (NIN) ati gba iwe ẹri idanimọ orilẹ-ede',
        requirements: [
          'Iwe ẹri ibimo tabi iṣọri ọjọ ori',
          'Iwe iwoleka to wulo (ti o ba wa)',
          'Iwe ẹri ṣiṣe ọkọ (ti o ba wa)',
          'Kaadi idibo (ti o ba wa)',
          'Lẹta idanimọ ijọba ibilẹ',
          'Awọn fọto iwe iwoleka meji lọwọlọwọ',
          'Fọọmu iforukọsilẹ NIN ti o pari'
        ],
        process_steps: [
          'Lo si ibikibi ibi iforukọsilẹ NIMC ni orilẹ-ede',
          'Gba ati pari fọọmu iforukọsilẹ NIN',
          'Fi awọn iwe pataki silẹ fun idaniloju',
          'Lọ si gbigba ami-ara (awọn ọwọ, fọto oju)',
          'Gba iwe NIN lọsẹ',
          'Duro fun iwe ẹri idanimọ orilẹ-ede (osu 3-6)',
          'Gba iwe ẹri ni ibi iforukọsilẹ tabi nipasẹ olugbe'
        ]
      },
      ha: {
        name: 'Rijistar Katin Shaida Ƙasa (NIN)',
        description: 'Rijistar lambar shaida ƙasa (NIN) da samun katin shaida ƙasa',
        requirements: [
          'Takaddun haihuwa ko bayanin shekaru',
          'Fasfo mai amfani (idan yana da shi)',
          'Lasisin direba (idan yana da shi)',
          'Katin zabe (idan yana da shi)',
          'Takarda shaida gwamnatin gunduma',
          'Hotunan fasfo guda biyu na baya-bayan nan',
          'Fom na rijistar NIN da aka kammala'
        ],
        process_steps: [
          'Ziyartar duk wani cibiyar rijistar NIMC a ƙasar',
          'Samu da kammala fom na rijistar NIN',
          'Mika takaddun da ake bukata don tabbatarwa',
          'Shiga daukar hoto da yatsa (yatsun hannu, hoton fuska)',
          'Karbi takardar NIN nan da nan',
          'Jira katin shaida ƙasa (watanni 3-6)',
          'Karbi katin shaida a cibiyar rijistar ko ta mai aikawa'
        ]
      },
      ig: {
        name: 'Ndebanye Aha Kaadị Njirimara Mba (NIN)',
        description: 'Debanye aha maka Nọmba Njirimara Mba (NIN) ma nweta kaadị njirimara mba',
        requirements: [
          'Akwụkwọ ọmụmụ ma ọ bụ nkwupụta afọ',
          'Passport bara uru (ọ bụrụ na ọ dị)',
          'Ikike ịnya ụgbọ ala (ọ bụrụ na ọ dị)',
          'Kaadị ịtụ vootu (ọ bụrụ na ọ dị)',
          'Akwụkwọ njirimara ọchịchị ime obodo',
          'Foto passport abụọ ọhụrụ',
          'Mpempe akwụkwọ ndebanye aha NIN zuru okè'
        ],
        process_steps: [
          'Gaa n ọrụ ndebanye aha NIMC ọ bụla nụzọ niile',
          'Nweta ma dejupụta mpempe akwụkwọ ndebanye aha NIN',
          'Chebata akwụkwọ achọrọ maka nkwenye',
          'Gaa nịnweta biometric (mkpịsị aka, onyonyo ihu)',
          'Nweta akwụkwọ NIN ozugbo',
          'Chere maka kaadị njirimara mba (ọnwa 3-6)',
          'Nweta kaadị njirimara nụlọ ọrụ ndebanye aha ma ọ bụ site na courier'
        ]
      }
    }
  },
  {
    id: 'drivers_license',
    name: 'Driver\'s License Application',
    description: 'Apply for Nigerian driver\'s license - Learner\'s permit, Provisional, or Permanent',
    category: 'Transportation',
    requirements: [
      'Valid National ID card (NIN)',
      'Birth certificate or declaration of age',
      'Medical fitness certificate',
      'Passport photographs (4 copies)',
      'Completed application form',
      'Eye test certificate',
      'Training certificate from accredited driving school',
      'Application fee receipt'
    ],
    process_steps: [
      'Visit any FRSC office or accredited driving school',
      'Complete driver\'s license application form',
      'Undergo medical examination and eye test',
      'Enroll in driving school training (if required)',
      'Take driving test at FRSC center',
      'Pay application fees (₦6,350 for new, ₦3,000 for renewal)',
      'Submit all required documents',
      'Wait for processing (2-4 weeks)',
      'Collect driver\'s license at FRSC office'
    ],
    estimated_time: '2-4 weeks',
    cost: '₦6,350 (new), ₦3,000 (renewal), ₦10,000 (replacement)',
    office_locations: ['All FRSC offices nationwide', 'Accredited driving schools'],
    translations: {
      en: {
        name: 'Driver\'s License Application',
        description: 'Apply for Nigerian driver\'s license - Learner\'s permit, Provisional, or Permanent',
        requirements: [
          'Valid National ID card (NIN)',
          'Birth certificate or declaration of age',
          'Medical fitness certificate',
          'Passport photographs (4 copies)',
          'Completed application form',
          'Eye test certificate',
          'Training certificate from accredited driving school',
          'Application fee receipt'
        ],
        process_steps: [
          'Visit any FRSC office or accredited driving school',
          'Complete driver\'s license application form',
          'Undergo medical examination and eye test',
          'Enroll in driving school training (if required)',
          'Take driving test at FRSC center',
          'Pay application fees (₦6,350 for new, ₦3,000 for renewal)',
          'Submit all required documents',
          'Wait for processing (2-4 weeks)',
          'Collect driver\'s license at FRSC office'
        ]
      },
      yo: {
        name: 'Iwe ẹri Ṣiṣe Ọkọ',
        description: 'Beere fun iwe ẹri ṣiṣe ọkọ Naijiria - Iwe ẹri ẹkọ, Iṣaaju, tabi Ti a Fi Simi',
        requirements: [
          'Kaadi idanimọ to wulo (NIN)',
          'Iwe ẹri ibimo tabi iṣọri ọjọ ori',
          'Iwe ẹri ilera',
          'Awọn fọto iwe iwoleka (4 copy)',
          'Fọọmu ibeere ti o pari',
          'Iwe ẹri idanwo oju',
          'Iwe ẹri ẹkọ lati ile ẹkọ ṣiṣe ọkọ ti a fi le',
          'Risiti owo sisanwo'
        ],
        process_steps: [
          'Lo si ibikibi ọfiisi FRSC tabi ile ẹkọ ṣiṣe ọkọ ti a fi le',
          'Pari fọọmu ibeere iwe ẹri ṣiṣe ọkọ',
          'Lọ si idanwo ilera ati idanwo oju',
          'Forukọsilẹ ni ẹkọ ile ẹkọ ṣiṣe ọkọ (ti o ba nilo)',
          'Ṣe idanwo ṣiṣe ọkọ ni ibi FRSC',
          'San awọn owo ibeere (₦6,350 fun tuntun, ₦3,000 fun tunṣe)',
          'Fi gbogbo awọn iwe pataki silẹ',
          'Duro fun iṣẹ-ṣiṣe (ọsẹ 2-4)',
          'Gba iwe ẹri ṣiṣe ọkọ ni ọfiisi FRSC'
        ]
      },
      ha: {
        name: 'Neman Lasisin Direba',
        description: 'Neman lasisin direba na Najeriya - Izinin koyo, Na wucin gadi, ko Na dindindin',
        requirements: [
          'Katin shaida ƙasa mai amfani (NIN)',
          'Takaddun haihuwa ko bayanin shekaru',
          'Takardar lafiyar likita',
          'Hotunan fasfo (kwafi 4)',
          'Fom na neman da aka kammala',
          'Takardar gwajin ido',
          'Takardar horo daga makarantar direba da aka amince',
          'Rasidin biyan kudin neman'
        ],
        process_steps: [
          'Ziyartar duk wani ofishin FRSC ko makarantar direba da aka amince',
          'Kammala fom na neman lasisin direba',
          'Shiga gwajin likita da gwajin ido',
          'Shiga horon makarantar direba (idan ake bukata)',
          'Yi gwajin direba a cibiyar FRSC',
          'Biya kudaden neman (₦6,350 ga sabo, ₦3,000 ga sabuntawa)',
          'Mika duk takaddun da ake bukata',
          'Jira sarrafa (makonni 2-4)',
          'Karbi lasisin direba a ofishin FRSC'
        ]
      },
      ig: {
        name: 'Ngwa Ikike Ịnya Ụgbọ Ala',
        description: 'Rịọ maka ikike ịnya ụgbọ ala Naịjịrịa - Ikike mmụta, nke oge, ma ọ bụ nke na-adịgide adịgide',
        requirements: [
          'Kaadị njirimara mba bara uru (NIN)',
          'Akwụkwọ ọmụmụ ma ọ bụ nkwupụta afọ',
          'Asambodo ahụike',
          'Foto passport (4 copy)',
          'Mpempe akwụkwọ ngwa zuru okè',
          'Asambodo ule anya',
          'Asambodo ọzụzụ site na ụlọ akwụkwọ ịnya ụgbọ ala a kwadoro',
          'Akwụkwọ ịkwụ ụgwọ ngwa'
        ],
        process_steps: [
          'Gaa nụlọ ọrụ FRSC ọ bụla ma ọ bụ ụlọ akwụkwọ ịnya ụgbọ ala a kwadoro',
          'Dejupụta mpempe akwụkwọ ngwa ikike ịnya ụgbọ ala',
          'Gaa nule ahụike na ule anya',
          'Debanye aha na ọzụzụ ụlọ akwụkwọ ịnya ụgbọ ala (ọ bụrụ na achọrọ)',
          'Were ule ịnya ụgbọ ala na ụlọ ọrụ FRSC',
          'Kwụọ ụgwọ ngwa (₦6,350 maka ọhụrụ, ₦3,000 maka mmegharị)',
          'Chebata akwụkwọ niile achọrọ',
          'Chere maka nhazi (izu 2-4)',
          'Nweta ikike ịnya ụgbọ ala nụlọ ọrụ FRSC'
        ]
      }
    }
  },
  {
    id: 'business_registration',
    name: 'Business Registration (CAC)',
    description: 'Register your business with Corporate Affairs Commission (CAC)',
    category: 'Business',
    requirements: [
      'Completed CAC forms (CAC 1.1, CAC 1.2, CAC 2.1)',
      'Memorandum of Association',
      'Articles of Association',
      'Statement of share capital',
      'Declaration of compliance',
      'Passport photographs of directors',
      'Valid means of identification',
      'Registration fee'
    ],
    process_steps: [
      'Visit CAC website: https://www.cac.gov.ng',
      'Conduct name availability search',
      'Complete online registration forms',
      'Upload required documents',
      'Pay registration fee online (₦10,000 - ₦50,000)',
      'Submit application for processing',
      'Wait for approval (2-3 weeks)',
      'Download Certificate of Incorporation',
      'Collect original certificate from CAC office'
    ],
    estimated_time: '2-3 weeks',
    cost: '₦10,000 - ₦50,000 (depends on share capital)',
    office_locations: ['All state capitals', 'CAC headquarters Abuja', 'CAC offices nationwide'],
    translations: {
      en: {
        name: 'Business Registration (CAC)',
        description: 'Register your business with Corporate Affairs Commission (CAC)',
        requirements: [
          'Completed CAC forms (CAC 1.1, CAC 1.2, CAC 2.1)',
          'Memorandum of Association',
          'Articles of Association',
          'Statement of share capital',
          'Declaration of compliance',
          'Passport photographs of directors',
          'Valid means of identification',
          'Registration fee'
        ],
        process_steps: [
          'Visit CAC website: https://www.cac.gov.ng',
          'Conduct name availability search',
          'Complete online registration forms',
          'Upload required documents',
          'Pay registration fee online (₦10,000 - ₦50,000)',
          'Submit application for processing',
          'Wait for approval (2-3 weeks)',
          'Download Certificate of Incorporation',
          'Collect original certificate from CAC office'
        ]
      },
      yo: {
        name: 'Iforukọsilẹ Iṣowo (CAC)',
        description: 'Forukọsilẹ iṣowo rẹ pẹlu Ọgbakọ Awọn Iṣẹ Ọgbakọ (CAC)',
        requirements: [
          'Awọn fọọmu CAC ti o pari (CAC 1.1, CAC 1.2, CAC 2.1)',
          'Iwe adehun ajọ',
          'Awọn ofin ajọ',
          'Alaye owo ajọ',
          'Iṣọri idaamu',
          'Awọn fọto iwe iwoleka awọn oludari',
          'Ọna idanimọ to wulo',
          'Owo iforukọsilẹ'
        ],
        process_steps: [
          'Lo si ayelujara CAC: https://www.cac.gov.ng',
          'Ṣe wiwa orukọ ti o wa',
          'Pari awọn fọọmu iforukọsilẹ lori ayelujara',
          'Gbe awọn iwe pataki soke',
          'San owo iforukọsilẹ lori ayelujara (₦10,000 - ₦50,000)',
          'Fi ibeere silẹ fun iṣẹ-ṣiṣe',
          'Duro fun idaamu (ọsẹ 2-3)',
          'Ṣe igbasilẹ Iwe-ẹri Idasile',
          'Gba iwe-ẹri oriṣiriṣi lati ọfiisi CAC'
        ]
      },
      ha: {
        name: 'Rijista Kasuwanci (CAC)',
        description: 'Rijista kasuwanci a Hukumar Harkokin Kamfanoni (CAC)',
        requirements: [
          'Cikakken fom na CAC (CAC 1.1, CAC 1.2, CAC 2.1)',
          'Takaddun yarjejeniya',
          'Takaddun dokokin kasuwanci',
          'Bayanin jarin hannun jari',
          'Sanarwar yarda',
          'Hotunan fasfo na shugabannin',
          'Hanyar shaida mai amfani',
          'Kudin rijista'
        ],
        process_steps: [
          'Ziyartar gidan yanar gizo na CAC: https://www.cac.gov.ng',
          'Bincika samuwar suna',
          'Kammala fom na rijista ta yanar gizo',
          'Saka takardun da ake bukata',
          'Biya kudin rijista ta yanar gizo (₦10,000 - ₦50,000)',
          'Mika neman don sarrafa',
          'Jira amincewa (makonni 2-3)',
          'Zazzage takardar shedar kafa kasuwanci',
          'Karbi takardar asali daga ofishin CAC'
        ]
      },
      ig: {
        name: 'Ndebanye Aha Azụmaahịa (CAC)',
        description: 'Debanye aha azụmaahịa gị na Kọmitii Ọrụ Ụlọọrụ (CAC)',
        requirements: [
          'Mpempe akwụkwọ CAC zuru okè (CAC 1.1, CAC 1.2, CAC 2.1)',
          'Akwụkwọ nkwekọrịta otu',
          'Akwụkwọ iwu otu',
          'Nkwupụta ego òkè',
          'Nkwupụta nkwenye',
          'Foto passport nke ndị isi',
          'Ụzọ njirimara bara uru',
          'Ego ndebanye aha'
        ],
        process_steps: [
          'Gaa na weebụsaịtị CAC: https://www.cac.gov.ng',
          'Chọọ ma aha ahụ dị',
          'Dejupụta mpempe akwụkwọ ndebanye aha nịntanetị',
          'Bulite akwụkwọ achọrọ',
          'Kwụọ ego ndebanye aha nịntanetị (₦10,000 - ₦50,000)',
          'Chebata ngwa maka nhazi',
          'Chere maka nkwenye (izu 2-3)',
          'Budata Asambodo nguzobe',
          'Nweta asambodo mbụ nụlọ ọrụ CAC'
        ]
      }
    }
  },
  {
    id: 'tax_payment',
    name: 'Tax Payment and Filing',
    description: 'Pay taxes and file tax returns with Federal Inland Revenue Service (FIRS)',
    category: 'Taxation',
    requirements: [
      'Tax Identification Number (TIN)',
      'Business registration documents (for business tax)',
      'Financial records and statements',
      'Previous year tax returns (if applicable)',
      'Bank account details',
      'Valid means of identification',
      'Completed tax forms'
    ],
    process_steps: [
      'Register for TIN at FIRS office or online',
      'Obtain relevant tax forms',
      'Complete tax returns with accurate financial information',
      'Calculate tax liability',
      'Pay taxes online via FIRS portal or designated banks',
      'Submit tax returns to FIRS',
      'Keep copies of payment receipts and returns',
      'File annual returns by March 31st of following year'
    ],
    estimated_time: 'Same day (payment), 1-2 weeks (processing)',
    cost: 'Varies by income/business type (Personal: 7-24%, Corporate: 30%)',
    office_locations: ['All FIRS offices nationwide', 'Designated banks', 'Online portal'],
    translations: {
      en: {
        name: 'Tax Payment and Filing',
        description: 'Pay taxes and file tax returns with Federal Inland Revenue Service (FIRS)',
        requirements: [
          'Tax Identification Number (TIN)',
          'Business registration documents (for business tax)',
          'Financial records and statements',
          'Previous year tax returns (if applicable)',
          'Bank account details',
          'Valid means of identification',
          'Completed tax forms'
        ],
        process_steps: [
          'Register for TIN at FIRS office or online',
          'Obtain relevant tax forms',
          'Complete tax returns with accurate financial information',
          'Calculate tax liability',
          'Pay taxes online via FIRS portal or designated banks',
          'Submit tax returns to FIRS',
          'Keep copies of payment receipts and returns',
          'File annual returns by March 31st of following year'
        ]
      },
      yo: {
        name: 'Sisanwo Ori ati Fifiranṣẹ',
        description: 'San ori ati fi awọn idahun ori silẹ pẹlu Ọgbakọ Ori Inu Ilẹ (FIRS)',
        requirements: [
          'Nọmba Idanimọ Ori (TIN)',
          'Awọn iwe iforukọsilẹ iṣowo (fun ori iṣowo)',
          'Awọn iwe owo ati awọn alaye',
          'Awọn idahun ori ọdun sẹhin (ti o ba wulo)',
          'Awọn alaye akọọlẹ banki',
          'Ọna idanimọ to wulo',
          'Awọn fọọmu ori ti o pari'
        ],
        process_steps: [
          'Forukọsilẹ fun TIN ni ọfiisi FIRS tabi lori ayelujara',
          'Gba awọn fọọmu ori to yẹ',
          'Pari awọn idahun ori pẹlu alaye owo to tọ',
          'Ṣe iṣiro iṣoro ori',
          'San ori lori ayelujara nipasẹ ibi FIRS tabi awọn banki ti a yan',
          'Fi awọn idahun ori silẹ fun FIRS',
          'Tọju awọn risiti sisanwo ati awọn idahun',
          'Fi awọn idahun ọdọọdun silẹ titi di Oṣu Kẹta ọjọ 31 ti ọdun to n bọ'
        ]
      },
      ha: {
        name: 'Biyan Haraji da Ƙaddamar da Su',
        description: 'Biya haraji da ƙaddamar da bayanan haraji a Hukumar Haraji ta Cikin Gida (FIRS)',
        requirements: [
          'Lambar shaida haraji (TIN)',
          'Takaddun rijistar kasuwanci (ga harajin kasuwanci)',
          'Bayanin kuɗi da bayanai',
          'Bayanan haraji na shekarar da ta gabata (idan ya dace)',
          'Bayanin asusun banki',
          'Hanyar shaida mai amfani',
          'Fom na haraji da aka kammala'
        ],
        process_steps: [
          'Rijista don TIN a ofishin FIRS ko ta yanar gizo',
          'Samu fom na haraji masu dacewa',
          'Kammala bayanan haraji tare da bayanin kuɗi na gaskiya',
          'Lissafa bashin haraji',
          'Biya haraji ta yanar gizo ta hanyar gidan yanar gizo na FIRS ko bankunan da aka zaɓa',
          'Mika bayanan haraji zuwa FIRS',
          'Ajiye kwafin rasidin biyan kuɗi da bayanai',
          'Ƙaddamar da bayanan shekara-shekara nan da Maris 31 na shekara mai zuwa'
        ]
      },
      ig: {
        name: 'Ịkwụ Ụtụ Isi na Ntinye Akwụkwọ',
        description: 'Kwụọ ụtụ isi ma tinye akwụkwọ ụtụ isi na Ụlọọrụ Ụtụ Isi Etiti (FIRS)',
        requirements: [
          'Nọmba Njirimara Ụtụ Isi (TIN)',
          'Akwụkwọ ndebanye aha azụmaahịa (maka ụtụ isi azụmaahịa)',
          'Ihe ndekọ ego na nkwupụta',
          'Akwụkwọ ụtụ isi afọ gara aga (ọ bụrụ na ọ dị)',
          'Nkọwa akaụntụ ụlọ akụ',
          'Ụzọ njirimara bara uru',
          'Mpempe akwụkwọ ụtụ isi zuru okè'
        ],
        process_steps: [
          'Debanye aha maka TIN nụlọ ọrụ FIRS ma ọ bụ nịntanetị',
          'Nweta mpempe akwụkwọ ụtụ isi kwesịrị ekwesị',
          'Dejupụta akwụkwọ ụtụ isi na ozi ego ziri ezi',
          'Gbakọọ ụgwọ ụtụ isi',
          'Kwụọ ụtụ isi nịntanetị site na portal FIRS ma ọ bụ ụlọ akụ ahọpụtara',
          'Chebata akwụkwọ ụtụ isi na FIRS',
          'Debekọọ akwụkwọ ịkwụ ụgwọ na nloghachi',
          'Tinye akwụkwọ afọ ọ bụla tupu March 31 nke afọ na-esote'
        ]
      }
    }
  }
];