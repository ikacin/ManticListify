import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core';
import {
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { useTranslation } from 'react-i18next';
import { showNotification,updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { IconStar } from '@tabler/icons-react';
import Favico from "./Favico";


const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
            },
        },
    },
}));

const data = [
    { link: '', label: 'Notifications', icon: IconBellRinging },
    { link: '', label: 'Billing', icon: IconReceipt2 },
    { link: '', label: 'Security', icon: IconFingerprint },
    { link: '', label: 'SSH Keys', icon: IconKey },
    { link: '', label: 'Databases', icon: IconDatabaseImport },
    { link: '', label: 'Authentication', icon: Icon2fa },
    { link: '', label: 'Other Settings', icon: IconSettings },
];

export function NavbarSimple() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');
    const [currentLang, setCurrentLang] = useState('en');
    const [textLang, setTextLang] = useState('Kullanılan Dil Türkçe');
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const links = data.map((item) => (
        <a
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));



    const clickHandle = async lang => {
        if (currentLang !== lang) {
            await i18n.changeLanguage(lang);
            setCurrentLang(lang);
        }

        if (lang === 'tr'){
            setTextLang('Kullanılan Dil İngilizce')
        }if (lang === 'en'){
            setTextLang('Kullanılan Dil Türkçe')
        }
        showNotification({
            id: 'load-data',
            autoClose: false,
            disallowClose: true,
            loading: true,
            title:t("Please Wait"),
        })
        setTimeout(() => {
            updateNotification({
                id: 'load-data',
                color: 'teal',
                title:textLang,
                message: t('Notification_close'),
                icon: <IconCheck size="1rem" />,
                autoClose: 1000,
            });
        }, 1000);
    };

    const gotoLogin = () => {
        navigate("/login")
    }

    return (
        <Navbars height={920} width={{ sm: 300 }} p="md">
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <MantineLogo size={28} />
                    <Favico/>
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                {/*<a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>*/}
                {/*    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />*/}
                {/*    <span>Change account</span>*/}
                {/*</a>*/}

                <a href="#" className={classes.link}>
                    <IconStar  className={classes.linkIcon} stroke={1.5} />
                    <span>{t("Active_language")}  {i18n.language.toUpperCase()}</span>
                </a>
                <a href="#" className={classes.link} onClick={() => clickHandle(currentLang === 'en' ? 'tr' : 'en')}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>{t('change_lang')}</span>
                </a>

                <a href="#" className={classes.link} onClick={() => gotoLogin()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>{t('logout')}</span>
                </a>


            </Navbar.Section>
        </Navbars>
    );
}


const Navbars = styled(Navbar)`
  position: absolute;

`



export default NavbarSimple