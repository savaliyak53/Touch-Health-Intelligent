
export const getBgForLifestyle = (type: string): string => {
    switch (type) {
        case 'Sleep':
            return '/assets/images/cur8-sleep.svg';
        case 'Movement':
            return '/assets/images/cur8-movement.svg';
        case 'Mental Wellbeing':
            return '/assets/images/cur8-mental-wellbeing.svg';
        case 'Nutrition':
            return '/assets/images/cur8-nutrition.svg';
        case 'Productivity':
            return '/assets/images/cur8-poductivity.svg';
    }
    return '/assets/images/cur8-sleep.svg'
}

export const getBtnColorForLifestyle = (type: string): string => {
    switch (type) {
        case 'Movement':
        case 'Sleep':
            return 'F0ECE7';
        case 'Mental Wellbeing':
        case 'Productivity':
            return '204ECF';
        case 'Nutrition':
            return 'EA9836';
    }
    return 'F0ECE7'
}

export const getSubtitleColorForLifestyle = (type: string): string => {
    switch (type) {
        case 'Sleep':
        case 'Movement':
            return 'FEFBF1';
        case 'Mental Wellbeing':
            return '83A5F2';
        case 'Nutrition':
            return 'F9A197';
        case 'Productivity':
            return '204ecfb3';
    }
    return 'FEFBF1'
}

export const getValueColorForLifestyle = (type: string): string => {
    switch (type) {
        case 'Sleep':
            return 'EFB7A8';
        case 'Productivity':
        case 'Mental Wellbeing':
        case 'Movement':
            return '204ECF';
        case 'Nutrition':
            return 'EA9836';
    }
    return '204ECF'
}

export const getShadowForLifestyle = (type: string): string => {
    switch (type) {
        case 'Sleep':
            return '0px 4px 0px 0px #8AA4EC';
        case 'Movement':
            return '0px 4px 0px 0px #204ECF';
        case 'Mental Wellbeing':
            return '0px 4px 0px 0px #F9A197';
        case 'Nutrition':
            return '0px 4px 0px 0px #EA9836';
        case 'Productivity':
            return '0px 4px 0px 0px #9DD7B4';
    }
    return '0px 4px 0px 0px #8AA4EC'
}

export const getIndexLifestyle = (type: string): number => {
    switch (type) {
        case 'Sleep':
            return 0;
        case 'Movement':
            return 1;
        case 'Mental Wellbeing':
            return 2;
        case 'Nutrition':
            return 3;
        case 'Productivity':
            return 4;
    }
    return 0;
}