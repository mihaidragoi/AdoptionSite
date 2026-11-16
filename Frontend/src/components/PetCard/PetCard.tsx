import { translate } from '@/i18n/translate.ts'

import './PetCard.css'

type PetCardProps = {
    name: string;
    birthDate: string;
    description: string;
    imageUrl: string;
};

export function getAgeInMonths(birthDate: Date | string, today: Date = new Date()): number {
    const birth = new Date(birthDate);

    let months =
        (today.getFullYear() - birth.getFullYear()) * 12 +
        (today.getMonth() - birth.getMonth());

    if (today.getDate() < birth.getDate()) {
        months--;
    }

    return Math.max(0, months);
}

export function formatAge(birthDate: Date | string): string {
    const total = getAgeInMonths(birthDate);
    const years = Math.floor(total / 12);
    const months = total % 12;

    if (years === 0) return translate('age.months', { count: months });
    if (months === 0) return translate('age.years', { count: years });

    return translate('age.yearsAndMonths', {
        years: translate('age.years', { count: years }),
        months: translate('age.months', { count: months }),
    });
}

export default function PetCard({ name, birthDate, description, imageUrl }: PetCardProps) {
    return (
        <div className='pet-card'>
            <img src={imageUrl} alt={name} />
            <h3>{name}</h3>
            <h4>{formatAge(birthDate)}</h4>
            <p>{description}</p>
            <button className='pet-card-button'>{translate('pet.viewDetails')}</button>
        </div>
    );
}
