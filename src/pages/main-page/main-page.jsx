import React from "react";
import "./main-page.scss";
import {FilmCard} from "../../common-ui/film-card/film-card.jsx";

const seriesData = [
    { id: 1, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZlrGetRldGhT6FxjF-03d3m9HMMjWhblW2nbKADxsSMsvenn_FAyebdU6uJRS2Sl3i7o8OCkW1-kZeXLcUiSyf510vjk55p4xmf27k6lcLbN_vaLj0faTj3Bp5xKJoEc9QenIOcAHFkq5xALmV01NuLiRNVf_A6vtWhfFc4qqXj5MEMBgoENzRHNtapQg_YdFTguzzYB8Sz_4t-WMB3TeOyh_dAMxEUTcd326sjEs8RUNLuYbbodBLFtXbg7oKEwtYo8_K7haax2r' },
    { id: 2, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArqyf7PuC_1YHPJV799hSfCdpeZqBcAzJx6qH0Y3dJJAoaECCWn0VWxFbSEqVMYnAdnEmL8T--bkzm6QPgzNVckRx1TLH8jwAWYFvzE_ILwTyyJbOfoWuu6oh6Ti7kbyh16pUSJeOhRGvZVQmKxb3eTGuk2Tl1mG_kbJzEwXmC75BKG97Df-llvhMuueAlN84GjVCATCBJp4rcbufJep7e_3NfmJkDLCq3KSJPrJp7vUIJXhT5yaExUVinyOFngjN60SFNegJsYvW4' },
    { id: 3, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyLlZPE4xiNd8ws18z9MgTmsWkKrUQz5swjk_4IVsvszxKQuPLC1pjypBHrdOCoWMupvPIZZ52_XG8DyzHejOxTn6c5b7Lq9-J8hqG1ztxdPQD5f9TUklw8yh94glJarb-KEsEKONJhGkAkGD4wplPdzHb1VtKUa7DLDo58Ook-yWI83xOqaVuGVCVj-aqYoyFQG21rn5N0t8F6EKesTkWsW8WnlBpxKt1r9wfwWaNpk-SVIkw8w9jDnm48WyCsIp_xxa_fmQtgmAm' },
    { id: 4, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaF572qYLclVJ5NxQ-UC8yR-Ma0yevXhSU4kKVHVFJ3AaMOftkXJiXaUaliWCd8spFKDXOwNsrFMU8_E4O6oVuXMh1HGJcOCQoX-167lMtQWQPwTANmSrkljgSu1e-7S1YlJE5J_x3PvvYoHk-3fp9HVZn7hNRKLRhDtcPRra4DvfrtQ5GjtnLpAY_gywpm9snZkXb7p_LkmOz72i5-4c8ahZCpY7xhcbYoyLlk7fE0tfcS01_KElWKLEgOFNlOXG_6fO0dexZzaJj' },
    { id: 5, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmnmIA9ixYlw5rOb5VXjz66P9qcpM-ONY4g9noICXOGU6C1kK8Xi1QWY5gZEaLjqnSbJudpm-CJ6JIOkrVmPuENePlc7L2MRaYaKK0DmI9DIj-EOdvfWdwXFnsvGBYwEBPb8fMzTjkB8DCac3I8nOdc9kSCuRTCXdyhRFOSmyHaiA1a0Rj2sR8yPQw9SsCm4fIEQqNxXZx7jhVgmEdrJ4cLZQD3pjcMp4xz9rS8fj7IIgF7AfkWRgDONAaLgMWN-tDt6eycc_YSMtO' },
    { id: 6, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAURmCb7PzBlOPMmQFLaqqCc8ldeyAlwRJ2IS43DNnim_92koL7smdy_z2AqG5JbmWP-pkvF0u3OqWfeLEXy0Wui6EYHdvtUgxyUs6ga9H27e1GuYYByupKa9qpBkW_1yKb10bzwarv3kyr3auiMNjrWthcQW5EsXqAX5JK2U8C5OKEY3cKQz15N95Bn2Zfr8MeLPX46XPazfj6-yEymzSchajCKgF0-4sOAMwHVk8wOeZF6Tza9WkJc1xu6pT2_V49IqZQrU1a5mOl' },
    { id: 7, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiMyoxNAFwImRF_zv9RkWKIzTxf8YmI6uLUfQPDkpi6qEwHmxQnuGEoHNzGiCPct97MgZ0--m-W9XPYnrcPOV0QN9BEokUzBpAOi1gWQabvYu5GT5C7R0Ea88t2w7HW6BmT1MTF86qqiihRz9XbCrsE6nitJsI3S52uLmNS9mkXWT1JUQQVH3upHttpxSS1Jq17GkTsYVvtTetXFMYNCD_yuiIgKW56VGRJiWODSopyiCjBMuVeXLKTWinLnPmO4wB8XgMHcodSuro' },
    { id: 8, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBICD6JtvbU65aoIig5BbHtUpt9V5c0V4lxGO0wJxBoI9XLnHb8xAfF-nc2HnCDKnT8azpIdZJ9ikxKaClQdQqgMtF8NZBQpilrOTb4vxFJa5sJWZJtnCVAYawmYtErchgy-Ud1dANHtsZskJJ4BOzUPGEYgYk_dyY1RRPg2ILPDEn7ttZaB63WwmOnaqAcdmvABhoMnX_IaKTSz7hlNs4doY1ok4wmoiVIND2UKHdQLRnKzzqdpTiIBUx6OxoNEuDmge4vGwhICXgA' },
    { id: 9, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYFZBBgcgUqOQuWkKNWETfFVNmWGYlq0L4TfH4kJayvcfhO7EtBhI9oHd-GdQwfs03xq9eD-Cp0Sqec_ckQW6IbHmw8Uf87On6k3VRNZO5-hMyZaMrRZRvrE6GKdFvINDtNn7zsz9sjQ7s-nWaYZrfA2hym-TrbbAvbeSnvTDE7yTsXxAav17D5qQnS2sOsZJZCl46iicDK_Zgi9O_RqvLoDzk5PYSt_eeOqfvJEmZJ5uFwRO1ukMNCWvgVLhyZ36WWzthpNGyPQ2Y' },
    { id: 10, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpOc64ecVpqR9-pdnM4l1M9grEdbsA_hupFK96iYe652jZ0tj_9YsjfIv_wCIpcSq4ijRdvstf4zFA_7UlzUIsrWH6cYE9NMLZqnFxWpCfjusp68J-yXIPLGfsU5zd_NB_D_Okea6Za_0U3-BYp1N7HjniLsh4bYP4kB5LIsLLpvwuXtQT6o2T_X43AMMf-NLxnuakhXaTRH_XQ18eSmBlzAU2YmLnJ_oVcnpfQGGSO3JuDuCHmxjqpM9fSzCPsrXuj4LoNpcFr-P1' },
    { id: 11, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJiSIAC387UrdG-DzQkEsaR743rZPRicEErtbq9q7Q00ZZq_1IgUvdpVVeWqFoJHYItLjOiRoT-zHm_SFbB38_ShnPBlSq4wEgvJOHLGOE-hv68hR06P0Kn2lj3gGmLa61KclGr6NaMZlPPfh1O2Xms_eodZdavJOaFuiCqj1pZ5MijsthUI2LEFNUOQvWDQs0n9BJp3lb1tVEJjWxJtsBR-Dj7GOEUr79mqSPzVkqvMXHeaelfjycR22XimjLRQMtu_uk_dn0XwLv' },
    { id: 12, title: 'Людина павук', year: 2002, seasons: 1, posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArqyf7PuC_1YHPJV799hSfCdpeZqBcAzJx6qH0Y3dJJAoaECCWn0VWxFbSEqVMYnAdnEmL8T--bkzm6QPgzNVckRx1TLH8jwAWYFvzE_ILwTyyJbOfoWuu6oh6Ti7kbyh16pUSJeOhRGvZVQmKxb3eTGuk2Tl1mG_kbJzEwXmC75BKG97Df-llvhMuueAlN84GjVCATCBJp4rcbufJep7e_3NfmJkDLCq3KSJPrJp7vUIJXhT5yaExUVinyOFngjN60SFNegJsYvW41' },
];

const MainPage = () => {
    return (
        <div className="novaflix-app dark">
            <main className="container main-content">
                <h2 className="section-title">Серіали</h2>
                <div className="series-grid">
                    {seriesData.map((series) => (
                        <FilmCard key={series.id} series={series} />
                    ))}
                </div>
            </main>
        </div>
    );
};
export default MainPage;
