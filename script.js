document.addEventListener('DOMContentLoaded', () => {
    // --- PROXY-INSTELLING ---
    const PROXY_URL = 'https://corsproxy.io/?';
    const MAX_JURISPRUDENCE_RESULTS = 10000;

    // --- DATA (direct in de code voor betrouwbaarheid) ---
    const rechtsgebieden = [
        { name: 'Bestuursrecht', id: 'http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht' },
        { name: 'Civiel recht', id: 'http://psi.rechtspraak.nl/rechtsgebied#civielRecht' },
        { name: 'Internationaal publiekrecht', id: 'http://psi.rechtspraak.nl/rechtsgebied#internationaalPubliekrecht' },
        { name: 'Strafrecht', id: 'http://psi.rechtspraak.nl/rechtsgebied#strafrecht' }
    ];

    const proceduresoorten = [
        { name: 'Artikel 81 RO-zaken', id: 'http://psi.rechtspraak.nl/procedure#artikel81ROzaken' }, { name: 'Bodemzaak', id: 'http://psi.rechtspraak.nl/procedure#bodemzaak' }, { name: 'Cassatie', id: 'http://psi.rechtspraak.nl/procedure#cassatie' }, { name: 'Cassatie in het belang der wet', id: 'http://psi.rechtspraak.nl/procedure#cassatieInHetBelangDerWet' }, { name: 'Conservatoire maatregel', id: 'http://psi.rechtspraak.nl/procedure#conservatoireMaatregel' }, { name: 'Eerste aanleg - enkelvoudig', id: 'http://psi.rechtspraak.nl/procedure#eersteAanlegEnkelvoudig' }, { name: 'Eerste aanleg - meervoudig', id: 'http://psi.rechtspraak.nl/procedure#eersteAanlegMeervoudig' }, { name: 'Eerste en enige aanleg', id: 'http://psi.rechtspraak.nl/procedure#eersteEnEnigeAanleg' }, { name: 'Herziening', id: 'http://psi.rechtspraak.nl/procedure#herziening' }, { name: 'Hoger beroep', id: 'http://psi.rechtspraak.nl/procedure#hogerBeroep' }, { name: 'Hoger beroep kort geding', id: 'http://psi.rechtspraak.nl/procedure#hogerBeroepKortGeding' }, { name: 'Kort geding', id: 'http://psi.rechtspraak.nl/procedure#kortGeding' }, { name: 'Mondelinge uitspraak', id: 'http://psi.rechtspraak.nl/procedure#mondelingeUitspraak' }, { name: 'Peek', id: 'http://psi.rechtspraak.nl/procedure#peek' }, { name: 'Prejudiciële beslissing', id: 'http://psi.rechtspraak.nl/procedure#prejudicieleBeslissing' }, { name: 'Prejudicieel verzoek', id: 'http://psi.rechtspraak.nl/procedure#prejudicieelVerzoek' }, { name: 'Prejudiciële spoedprocedure (PPU)', id: 'http://psi.rechtspraak.nl/procedure#prejudicieleSpoedprocedure(PPU)' }, { name: 'Proceskostenveroordeling', id: 'http://psi.rechtspraak.nl/procedure#proceskostenveroordeling' }, { name: 'Proces-verbaal', id: 'http://psi.rechtspraak.nl/procedure#procesverbaal' }, { name: 'Raadkamer', id: 'http://psi.rechtspraak.nl/procedure#raadkamer' }, { name: 'Rekestprocedure', id: 'http://psi.rechtspraak.nl/procedure#rekestprocedure' }, { name: 'Schadevergoedingsuitspraak', id: 'http://psi.rechtspraak.nl/procedure#schadevergoedingsuitspraak' }, { name: 'Tussenuitspraak bestuurlijke lus', id: 'http://psi.rechtspraak.nl/procedure#tussenuitspraakBestuurlijkeLus' }, { name: 'Uitspraak na prejudiciële beslissing', id: 'http://psi.rechtspraak.nl/procedure#uitspraakNaPrejudicieleBeslissing' }, { name: 'Vereenvoudigde behandeling', id: 'http://psi.rechtspraak.nl/procedure#vereenvoudigdeBehandeling' }, { name: 'Versnelde behandeling', id: 'http://psi.rechtspraak.nl/procedure#versneldeBehandeling' }, { name: 'Verstek', id: 'http://psi.rechtspraak.nl/procedure#verstek' }, { name: 'Verwijzing na Hoge Raad', id: 'http://psi.rechtspraak.nl/procedure#verwijzingNaHogeRaad' }, { name: 'Verzet', id: 'http://psi.rechtspraak.nl/procedure#verzet' }, { name: 'Voorlopige voorziening', id: 'http://psi.rechtspraak.nl/procedure#voorlopigeVoorziening' }, { name: 'Voorlopige voorziening+bodemzaak', id: 'http://psi.rechtspraak.nl/procedure#voorlopigeVoorzieningbodemzaak' }, { name: 'Wraking', id: 'http://psi.rechtspraak.nl/procedure#wraking' }, { name: 'Op tegenspraak', id: 'http://psi.rechtspraak.nl/procedure#opTegenspraak' }, { name: 'Belemmeringenwet Privaatrecht', id: 'http://psi.rechtspraak.nl/procedure#belemmeringenwetPrivaatrecht' }, { name: 'Artikel 80a RO-zaken', id: 'http://psi.rechtspraak.nl/procedure#artikel80aROzaken' }, { name: 'Beschikking', id: 'http://psi.rechtspraak.nl/procedure#beschikking' }, { name: 'Tussenbeschikking', id: 'http://psi.rechtspraak.nl/procedure#tussenbeschikking' }, { name: 'Herroeping', id: 'http://psi.rechtspraak.nl/procedure#herroeping' }, { name: 'Verschoning', id: 'http://psi.rechtspraak.nl/procedure#verschoning' }, { name: 'Tussenuitspraak', id: 'http://psi.rechtspraak.nl/procedure#tussenuitspraak' }, { name: 'Geheimhoudingsbeslissing', id: 'http://psi.rechtspraak.nl/procedure#geheimhoudingsbeslissing' }, { name: 'NCC', id: 'http://psi.rechtspraak.nl/procedure#NCC' }, { name: 'NCCA', id: 'http://psi.rechtspraak.nl/procedure#NCCA' }, { name: 'Beslissing RC', id: 'http://psi.rechtspraak.nl/procedure#beslissingRC' }
    ];

    const instanties = [
        { name: "Hoge Raad", id: "http://standaarden.overheid.nl/owms/terms/Hoge_Raad_der_Nederlanden" }, { name: "Raad van State", id: "http://standaarden.overheid.nl/owms/terms/Raad_van_State" }, { name: "Centrale Raad van Beroep", id: "http://standaarden.overheid.nl/owms/terms/Centrale_Raad_van_Beroep" }, { name: "College van Beroep voor het bedrijfsleven", id: "http://standaarden.overheid.nl/owms/terms/College_van_Beroep_voor_het_bedrijfsleven" }, { name: "Rechtbank Amsterdam", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Amsterdam" }, { name: "Rechtbank Den Haag", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Den_Haag" }, { name: "Rechtbank Gelderland", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Gelderland" }, { name: "Rechtbank Limburg", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Limburg" }, { name: "Rechtbank Midden-Nederland", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Midden-Nederland" }, { name: "Rechtbank Noord-Holland", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Noord-Holland" }, { name: "Rechtbank Noord-Nederland", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Noord-Nederland" }, { name: "Rechtbank Oost-Brabant", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Oost-Brabant" }, { name: "Rechtbank Overijssel", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Overijssel" }, { name: "Rechtbank Rotterdam", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Rotterdam" }, { name: "Rechtbank Zeeland-West-Brabant", id: "http://standaarden.overheid.nl/owms/terms/Rechtbank_Zeeland-West-Brabant" }, { name: "Gerechtshof Amsterdam", id: "http://standaarden.overheid.nl/owms/terms/Gerechtshof_Amsterdam" }, { name: "Gerechtshof Arnhem-Leeuwarden", id: "http://standaarden.overheid.nl/owms/terms/Gerechtshof_Arnhem-Leeuwarden" }, { name: "Gerechtshof Den Haag", id: "http://standaarden.overheid.nl/owms/terms/Gerechtshof_Den_Haag" }, { name: "Gerechtshof 's-Hertogenbosch", id: "http://standaarden.overheid.nl/owms/terms/Gerechtshof_'s-Hertogenbosch" }
    ];

    // --- DOM ELEMENTEN ---
    const elements = {
        apiFiltersContainer: document.getElementById('apiFiltersContainer'),
        apiFilters: document.getElementById('apiFilters'),
        showFiltersButton: document.getElementById('showFiltersButton'),
        resetFiltersButton: document.getElementById('resetFiltersButton'),
        periodPreset: document.getElementById('periodPreset'),
        dateFrom: document.getElementById('dateFrom'),
        dateTo: document.getElementById('dateTo'),
        dateFilterType: document.getElementById('dateFilterType'),
        subject: document.getElementById('subject'),
        creator: document.getElementById('creator'),
        clearCreator: document.getElementById('clearCreator'),
        creatorSuggestions: document.getElementById('creatorSuggestions'),
        sortOrder: document.getElementById('sortOrder'),
        apiSearchButton: document.getElementById('apiSearchButton'),
        loadingIndicator: document.getElementById('loadingIndicator'),
        jurisprudenceStatus: document.getElementById('jurisprudenceStatus'),
        resultsHeader: document.getElementById('resultsHeader'),
        totalResultsText: document.getElementById('totalResultsText'),
        refinedTotalResultsText: document.getElementById('refinedTotalResultsText'),
        activeFilters: document.getElementById('activeFilters'),
        refineFiltersSection: document.getElementById('refineFiltersSection'),
        keywordSearchInput: document.getElementById('keywordSearchInput'),
        searchInCheckboxes: document.querySelectorAll('input[name="searchIn"]'),
        procedureRefine: document.getElementById('procedureRefine'),
        zaaknummerRefine: document.getElementById('zaaknummerRefine'),
        betrokkenenRefine: document.getElementById('betrokkenenRefine'),
        refineSearchButton: document.getElementById('refineSearchButton'),
        backgroundLoader: document.getElementById('backgroundLoader'),
        jurisprudenceResults: document.getElementById('jurisprudenceResults'),
        jurisprudencePagination: document.getElementById('jurisprudencePagination'),
        wettenbankSearchButton: document.getElementById('wettenbankSearchButton'),
        wettenbankKeyword: document.getElementById('wettenbankKeyword'),
        wettenbankStatus: document.getElementById('wettenbankStatus'),
        wettenbankResults: document.getElementById('wettenbankResults'),
        toggleWettenbankFiltersButton: document.getElementById('toggleWettenbankFiltersButton'),
        wettenbankFacets: document.getElementById('wettenbankFacets'),
        wettenbankPagination: document.getElementById('wettenbankPagination'),
        keywordModal: document.getElementById('keywordModal'),
        closeKeywordModal: document.getElementById('closeKeywordModal'),
        keywordOptions: document.getElementById('keywordOptions'),
        searchWithKeywordsButton: document.getElementById('searchWithKeywordsButton')
    };

    // --- GLOBALE STATE ---
    let jurisprudenceMasterResults = [];
    let jurisprudenceCurrentResults = [];
    let totalJurisprudenceResults = 0;
    let jurisprudenceCurrentPage = 1;
    const jurisprudenceResultsPerPage = 10;
    let isJurisprudenceLoadingInBackground = false;

    let wettenbankCurrentQuery = '';
    let wettenbankActiveFacets = {};
    let wettenbankCurrentPage = 1;
    let wettenbankTotalResults = 0;
    const wettenbankResultsPerPage = 10;

    let debounceTimer = null;
    let isWettenbankFiltersVisible = false;

    // --- INITIALISATIE ---
    const initializeApp = () => {
        populateSelect(elements.subject, rechtsgebieden, 'Alle rechtsgebieden');
        populateSelect(elements.procedureRefine, proceduresoorten, 'Alle procedures');
        setupEventListeners();
        elements.apiFilters.classList.remove('collapsed'); 
    };

    const populateSelect = (selectElement, items, defaultOptionText) => {
        if (!selectElement) return;
        selectElement.innerHTML = `<option value="">-- ${defaultOptionText} --</option>`;
        items.sort((a, b) => a.name.localeCompare(b.name)).forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.name; // Filter on name client-side
            opt.textContent = item.name;
            selectElement.appendChild(opt);
        });
    };

    // --- EVENT LISTENERS ---
    const setupEventListeners = () => {
        elements.showFiltersButton.addEventListener('click', toggleApiFilters);
        elements.resetFiltersButton.addEventListener('click', resetAllFilters);
        
        elements.dateFrom.addEventListener('change', () => { if(elements.dateTo.value) elements.periodPreset.value = ''; });
        elements.dateTo.addEventListener('change', () => { if(elements.dateFrom.value) elements.periodPreset.value = ''; });
        elements.periodPreset.addEventListener('change', handlePeriodPresetChange);

        elements.creator.addEventListener('input', () => handleAutocompleteDebounced(elements.creator, elements.creatorSuggestions, instanties));
        elements.clearCreator.addEventListener('click', clearCreatorInput);
        
        elements.apiSearchButton.addEventListener('click', () => handleJurisprudenceSearch(true));
        elements.sortOrder.addEventListener('change', handleSortChange);
        
        elements.refineSearchButton.addEventListener('click', handleRefineSearch);

        elements.jurisprudenceResults.addEventListener('click', handleResultsClick);
        elements.wettenbankResults.addEventListener('click', handleResultsClick);

        elements.wettenbankSearchButton.addEventListener('click', () => handleWettenbankSearch(true));
        elements.wettenbankKeyword.addEventListener('keypress', e => { if (e.key === 'Enter') handleWettenbankSearch(true); });
        elements.toggleWettenbankFiltersButton.addEventListener('click', toggleWettenbankFilters);
        elements.wettenbankFacets.addEventListener('change', handleFacetChange);
        
        elements.jurisprudencePagination.addEventListener('click', handlePaginationClick);
        elements.wettenbankPagination.addEventListener('click', handlePaginationClick);
        elements.jurisprudencePagination.addEventListener('change', handlePageInputChange);
        elements.wettenbankPagination.addEventListener('change', handlePageInputChange);
        
        elements.closeKeywordModal.addEventListener('click', hideKeywordModal);
        elements.searchWithKeywordsButton.addEventListener('click', searchWithSelectedKeywords);
        document.addEventListener('click', (e) => { if (!e.target.closest('.autocomplete-container')) { elements.creatorSuggestions.innerHTML = ''; } });
    };

    // --- FILTER MANAGEMENT ---
    const toggleApiFilters = () => {
        const isCollapsed = elements.apiFilters.classList.toggle('collapsed');
        elements.showFiltersButton.innerHTML = `<span id="filterToggleIcon">${isCollapsed ? '▼' : '▲'}</span> ${isCollapsed ? 'Toon zoekfilters' : 'Verberg zoekfilters'}`;
    };
    
    const toggleWettenbankFilters = () => {
        isWettenbankFiltersVisible = !isWettenbankFiltersVisible;
        elements.wettenbankFacets.style.display = isWettenbankFiltersVisible ? 'block' : 'none';
        elements.toggleWettenbankFiltersButton.innerHTML = `<span id="wettenbankFilterToggleIcon">${isWettenbankFiltersVisible ? '▲' : '▼'}</span> ${isWettenbankFiltersVisible ? 'Verberg filters' : 'Verfijn resultaten'}`;
    };

    const resetAllFilters = () => {
        document.getElementById('apiFiltersContainer').querySelectorAll('input, select').forEach(el => {
            if (el.type === 'radio' || el.type === 'checkbox') el.checked = false;
            else el.value = '';
        });
        document.getElementById('refineFiltersSection').querySelectorAll('input, select').forEach(el => el.value = '');
        
        document.querySelector('input[name="documentType"][value=""]').checked = true;
        elements.sortOrder.value = 'date-desc';
        elements.dateFilterType.value = 'uitspraakdatum';
        elements.creator.removeAttribute('data-id');
        elements.clearCreator.style.display = 'none';
        
        jurisprudenceMasterResults = [];
        jurisprudenceCurrentResults = [];
        totalJurisprudenceResults = 0;
        jurisprudenceCurrentPage = 1;
        isJurisprudenceLoadingInBackground = false;

        elements.jurisprudenceResults.innerHTML = '';
        elements.jurisprudencePagination.innerHTML = '';
        elements.jurisprudenceStatus.style.display = 'none';
        elements.resultsHeader.style.display = 'none';
        elements.activeFilters.innerHTML = '';
        elements.refineFiltersSection.classList.add('hidden');
        elements.apiFilters.classList.remove('collapsed');
        elements.showFiltersButton.innerHTML = `<span id="filterToggleIcon">▲</span> Zoeken met filters`;

        showNotification('Alle filters zijn gewist.', 'success');
    };

    const handlePeriodPresetChange = () => {
        const preset = elements.periodPreset.value;
        if (!preset) {
            elements.dateFrom.value = '';
            elements.dateTo.value = '';
            return;
        }
        
        const today = new Date();
        let fromDate = new Date();
        let toDate = new Date();
        
        switch (preset) {
            case 'last-month': fromDate.setMonth(today.getMonth() - 1); break;
            case 'last-3-months': fromDate.setMonth(today.getMonth() - 3); break;
            case 'last-6-months': fromDate.setMonth(today.getMonth() - 6); break;
            case 'this-year': fromDate = new Date(today.getFullYear(), 0, 1); break;
            case 'last-year': fromDate = new Date(today.getFullYear() - 1, 0, 1); toDate = new Date(today.getFullYear() - 1, 11, 31); break;
        }
        elements.dateFrom.value = fromDate.toISOString().split('T')[0];
        elements.dateTo.value = toDate.toISOString().split('T')[0];
    };

    // --- AUTOCOMPLETE ---
    const handleAutocompleteDebounced = (input, suggestions, items) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => handleAutocomplete(input, suggestions, items), 300);
    };

    const handleAutocomplete = (input, suggestions, items) => {
        const query = input.value.toLowerCase().trim();
        suggestions.innerHTML = '';
        elements.clearCreator.style.display = query.length > 0 ? 'inline-block' : 'none';
        if (query.length < 2) return;
        const matches = items.filter(item => item.name.toLowerCase().includes(query)).slice(0, 8);
        if (matches.length === 0) { suggestions.innerHTML = '<div class="no-results">Geen instanties gevonden</div>'; return; }
        matches.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item.name;
            div.addEventListener('click', () => {
                input.value = item.name;
                input.dataset.id = item.id;
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(div);
        });
    };
    const clearCreatorInput = () => { elements.creator.value = ''; elements.creator.removeAttribute('data-id'); elements.creatorSuggestions.innerHTML = ''; elements.clearCreator.style.display = 'none'; };

    // --- ZOEKFUNCTIES (JURISPRUDENTIE) ---
    const buildJurisprudenceParams = (from = 0) => {
        const params = new URLSearchParams();
        if (elements.dateFrom.value) params.append(elements.dateFilterType.value === 'uitspraakdatum' ? 'date' : 'modified', elements.dateFrom.value);
        if (elements.dateTo.value) params.append(elements.dateFilterType.value === 'uitspraakdatum' ? 'date' : 'modified', elements.dateTo.value);
        if (elements.subject.value) params.append('subject', elements.subject.value);
        if (elements.creator.dataset.id) params.append('creator', elements.creator.dataset.id);
        const selectedType = document.querySelector('input[name="documentType"]:checked')?.value;
        if (selectedType) params.append('type', selectedType);
        
        params.append('return', 'DOC');
        params.append('max', '1000');
        params.set('from', from);
        return params;
    };

    const handleJurisprudenceSearch = async (isNewSearch = false) => {
        if (isNewSearch) {
            jurisprudenceMasterResults = [];
            totalJurisprudenceResults = 0;
            jurisprudenceCurrentPage = 1;
            isJurisprudenceLoadingInBackground = false;
        }

        elements.jurisprudenceResults.innerHTML = '';
        elements.jurisprudencePagination.innerHTML = '';
        elements.refineFiltersSection.classList.add('hidden');
        elements.resultsHeader.style.display = 'none';

        showLoading(true, true);
        displayActiveFilters();
        
        const params = buildJurisprudenceParams(0); 
        const requestUrl = `${PROXY_URL}${encodeURIComponent(`https://data.rechtspraak.nl/uitspraken/zoeken?${params.toString()}`)}`;

        try {
            const response = await fetch(requestUrl);
            if (!response.ok) throw new Error(`API-verzoek mislukt: ${response.status}`);
            const xmlString = await response.text();
            const xmlDoc = new DOMParser().parseFromString(xmlString, "application/xml");
            
            const subtitle = xmlDoc.querySelector('subtitle')?.textContent || '';
            totalJurisprudenceResults = parseInt(subtitle.match(/\d+/)?.[0] || '0', 10);
            
            if (totalJurisprudenceResults > 0) {
                 elements.totalResultsText.textContent = `${totalJurisprudenceResults} resultaten gevonden`;
                 elements.resultsHeader.style.display = 'block';
                 elements.refineFiltersSection.classList.remove('hidden');
                 if (!elements.apiFilters.classList.contains('collapsed')) {
                    toggleApiFilters();
                 }
                 
                 if (totalJurisprudenceResults > MAX_JURISPRUDENCE_RESULTS) {
                    showStatus(elements.jurisprudenceStatus, `Let op: er zijn meer dan ${MAX_JURISPRUDENCE_RESULTS} resultaten. Alleen de eerste ${MAX_JURISPRUDENCE_RESULTS} worden geladen. Verfijn uw zoekopdracht voor een completer resultaat.`, 'warning');
                 } else {
                    elements.jurisprudenceStatus.style.display = 'none';
                 }

                 const entries = Array.from(xmlDoc.getElementsByTagName('entry'));
                 const newResults = entries.map(entry => parseJurisprudenceEntry(entry));
                 jurisprudenceMasterResults.push(...newResults);
                 
                 handleRefineSearch();
                 
                 if(totalJurisprudenceResults > 1000) {
                    loadAllJurisprudenceInBackground();
                 }

            } else {
                 showStatus(elements.jurisprudenceStatus, 'Geen resultaten gevonden voor deze criteria.', 'warning');
                 elements.jurisprudenceResults.innerHTML = '';
                 elements.jurisprudencePagination.innerHTML = '';
            }

        } catch (error) {
            showStatus(elements.jurisprudenceStatus, `Fout: ${error.message}.`, 'error');
            console.error(error);
        } finally {
            showLoading(false, true);
        }
    };
    
    const loadAllJurisprudenceInBackground = async () => {
        if (isJurisprudenceLoadingInBackground) return;
        isJurisprudenceLoadingInBackground = true;
        elements.backgroundLoader.style.display = 'flex';

        let from = jurisprudenceMasterResults.length;
        const maxToFetch = Math.min(totalJurisprudenceResults, MAX_JURISPRUDENCE_RESULTS);

        while(from < maxToFetch) {
             const params = buildJurisprudenceParams(from);
             const requestUrl = `${PROXY_URL}${encodeURIComponent(`https://data.rechtspraak.nl/uitspraken/zoeken?${params.toString()}`)}`;

             try {
                const response = await fetch(requestUrl);
                if (!response.ok) break;
                const xmlString = await response.text();
                const xmlDoc = new DOMParser().parseFromString(xmlString, "application/xml");
                const entries = Array.from(xmlDoc.getElementsByTagName('entry'));

                if(entries.length === 0) break;

                const newResults = entries.map(entry => parseJurisprudenceEntry(entry));
                jurisprudenceMasterResults.push(...newResults);
                
                handleRefineSearch();

                from += entries.length;

             } catch (error) {
                console.error("Fout bij laden op achtergrond:", error);
                break;
             }
        }

        isJurisprudenceLoadingInBackground = false;
        elements.backgroundLoader.style.display = 'none';
        showNotification(`Alle ${jurisprudenceMasterResults.length} resultaten zijn geladen.`, 'success');
        
        handleRefineSearch();
    };

    const parseJurisprudenceEntry = (entry) => {
        const fullTitle = entry.querySelector('title')?.textContent || 'Geen titel';
        const ecli = entry.querySelector('id')?.textContent || 'Geen ECLI';
        const summary = entry.querySelector('summary')?.textContent || 'Geen samenvatting.';
        const link = entry.querySelector('link')?.getAttribute('href') || '#';

        const parser = new DOMParser();
        const contentXml = parser.parseFromString(entry.querySelector('content')?.textContent || '<rdf:RDF></rdf:RDF>', "application/xml");
        const description = contentXml.querySelector('Description');

        const getSafeText = (selector) => description?.querySelector(selector)?.textContent || '';

        const decisionDateRaw = getSafeText('date');
        const decisionDateObject = decisionDateRaw ? new Date(decisionDateRaw) : null;

        return {
            title: fullTitle, ecli, summary, link,
            instantie: getSafeText('creator'),
            uitspraakdatum: decisionDateObject ? decisionDateObject.toLocaleDateString('nl-NL') : 'N/A',
            zaaknummer: getSafeText('zaaknummer') || 'N/A',
            procedure: getSafeText('procedure') || 'N/A',
            betrokkenen: getSafeText('contributor') || 'N/A',
            dateObject: decisionDateObject
        };
    };

    const handleRefineSearch = () => {
        jurisprudenceCurrentPage = 1;
        const keyword = elements.keywordSearchInput.value.toLowerCase().trim();
        const searchIn = Array.from(elements.searchInCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const procedure = elements.procedureRefine.value;
        const zaaknummer = elements.zaaknummerRefine.value.toLowerCase().trim();
        const betrokkenen = elements.betrokkenenRefine.value.toLowerCase().trim();

        jurisprudenceCurrentResults = jurisprudenceMasterResults.filter(item => {
            const keywordMatch = !keyword || (
                (searchIn.includes('title') && item.title.toLowerCase().includes(keyword)) ||
                (searchIn.includes('summary') && item.summary.toLowerCase().includes(keyword)) ||
                (searchIn.includes('ecli') && item.ecli.toLowerCase().includes(keyword))
            );
            const procedureMatch = !procedure || item.procedure === procedure;
            const zaaknummerMatch = !zaaknummer || item.zaaknummer.toLowerCase().includes(zaaknummer);
            const betrokkenenMatch = !betrokkenen || item.betrokkenen.toLowerCase().includes(betrokkenen);
            
            return keywordMatch && procedureMatch && zaaknummerMatch && betrokkenenMatch;
        });

        handleSortChange();
    };
    
    const handleSortChange = () => {
        const sortValue = elements.sortOrder.value;
        jurisprudenceCurrentResults.sort((a, b) => {
            const dateA = a.dateObject;
            const dateB = b.dateObject;
            if (!dateA || !dateB) return 0;
            return sortValue === 'date-desc' ? dateB - dateA : dateA - dateB;
        });
        
        renderJurisprudenceResults();
    };
    
    // --- WETTENBANK SEARCH (SRU 2.0) ---
    const handleWettenbankSearch = async (isNewSearch = false) => {
        if (isNewSearch) {
            wettenbankCurrentQuery = elements.wettenbankKeyword.value.trim();
            wettenbankCurrentPage = 1;
            wettenbankActiveFacets = {};
            isWettenbankFiltersVisible = false;
            elements.wettenbankFacets.style.display = 'none';
            elements.toggleWettenbankFiltersButton.style.display = 'none';
        }

        if (!wettenbankCurrentQuery) { showNotification('Voer een trefwoord in.', 'error'); return; }

        showStatus(elements.wettenbankStatus, 'Wettenbank wordt doorzocht...', 'info');
        elements.wettenbankResults.innerHTML = '';
        if (isNewSearch) elements.wettenbankFacets.innerHTML = '';

        const keywordQuery = `cql.textAndIndexes = "${wettenbankCurrentQuery.replace(/"/g, '\\"')}"`;
        const facetClauses = Object.entries(wettenbankActiveFacets).map(([, queries]) => {
            return queries.length > 1 ? `(${queries.join(' OR ')})` : queries.join('');
        }).filter(Boolean).join(' AND ');

        const finalQuery = facetClauses ? `(${keywordQuery}) AND (${facetClauses})` : keywordQuery;
        
        const params = new URLSearchParams({
            query: finalQuery,
            maximumRecords: wettenbankResultsPerPage,
            startRecord: ((wettenbankCurrentPage - 1) * wettenbankResultsPerPage) + 1,
        });

        if (isNewSearch) {
            params.append('facetLimit', '10:w.organisatietype,10:dt.type');
        }

        const requestUrl = `${PROXY_URL}https://repository.overheid.nl/sru/Search`;

        try {
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params
            });
            if (!response.ok) throw new Error(`API-verzoek mislukt: ${response.status} ${response.statusText}`);
            const xmlString = await response.text();
            const xmlDoc = new DOMParser().parseFromString(xmlString, "application/xml");
            
            wettenbankTotalResults = parseInt(xmlDoc.querySelector('numberOfRecords')?.textContent || '0', 10);
            
            if(wettenbankTotalResults === 0) {
                 showStatus(elements.wettenbankStatus, `Geen resultaten gevonden voor "${wettenbankCurrentQuery}"`, 'warning');
                 elements.wettenbankPagination.innerHTML = '';
                 elements.toggleWettenbankFiltersButton.style.display = 'none';
                 return;
            }

            showStatus(elements.wettenbankStatus, `${wettenbankTotalResults} resultaten voor "${wettenbankCurrentQuery}"`, 'success');
            
            renderWettenbankResults(xmlDoc);
            renderPagination(elements.wettenbankPagination, wettenbankCurrentPage, Math.ceil(wettenbankTotalResults / wettenbankResultsPerPage), 'wettenbank');
            if (isNewSearch) {
                renderWettenbankFacets(xmlDoc);
            }
        } catch (error) {
            showStatus(elements.wettenbankStatus, `Fout: ${error.message}.`, 'error');
            console.error(error);
        }
    };

    const handleFacetChange = (e) => {
        const checkbox = e.target;
        if (checkbox.type !== 'checkbox') return;
        const index = checkbox.dataset.facetIndex;
        const query = checkbox.dataset.facetQuery;

        if (!wettenbankActiveFacets[index]) wettenbankActiveFacets[index] = [];

        if (checkbox.checked) {
            if (!wettenbankActiveFacets[index].includes(query)) wettenbankActiveFacets[index].push(query);
        } else {
            wettenbankActiveFacets[index] = wettenbankActiveFacets[index].filter(q => q !== query);
            if (wettenbankActiveFacets[index].length === 0) delete wettenbankActiveFacets[index];
        }
        
        wettenbankCurrentPage = 1;
        handleWettenbankSearch(false);
    };

    // --- RESULTATEN RENDERING & INTERACTIE ---
     const highlightText = (text, keyword) => {
        if (!keyword || !text) return text;
        const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(${escapedKeyword})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    };

    const renderJurisprudenceResults = () => {
        elements.jurisprudenceResults.innerHTML = '';
        elements.refinedTotalResultsText.textContent = `${jurisprudenceCurrentResults.length} van ${totalJurisprudenceResults} resultaten worden getoond`;
        const keyword = elements.keywordSearchInput.value.trim().toLowerCase();
        
        const startIndex = (jurisprudenceCurrentPage - 1) * jurisprudenceResultsPerPage;
        const paginatedResults = jurisprudenceCurrentResults.slice(startIndex, (startIndex + jurisprudenceResultsPerPage));

        paginatedResults.forEach((item, index) => {
            const globalIndex = startIndex + index;
            elements.jurisprudenceResults.innerHTML += createResultItemHTML(
                'jurisprudence', 
                highlightText(item.title, keyword), 
                item.link, 
                highlightText(item.summary, keyword),
                { "ECLI": highlightText(item.ecli, keyword), "Instantie": item.instantie, "Uitspraakdatum": item.uitspraakdatum, "Zaaknummer(s)": item.zaaknummer, "Procedure": item.procedure, "Betrokkenen": item.betrokkenen },
                `jurisprudence-${globalIndex}`
            );
        });
        
        if (jurisprudenceCurrentResults.length === 0 && totalJurisprudenceResults > 0) {
            elements.jurisprudenceResults.innerHTML = `<p class="status-message info" style="display:block;">Geen resultaten gevonden met uw verfijningscriteria. Pas de filters aan om meer resultaten te zien.</p>`;
        }
        
        renderPagination(elements.jurisprudencePagination, jurisprudenceCurrentPage, Math.ceil(jurisprudenceCurrentResults.length / jurisprudenceResultsPerPage), 'jurisprudence');
    };

    const renderWettenbankResults = (xmlDoc) => {
        const records = xmlDoc.querySelectorAll('recordData');
        let html = '';
        records.forEach((record, index) => {
            const globalIndex = `wettenbank-${((wettenbankCurrentPage - 1) * wettenbankResultsPerPage) + index}`;
            const meta = record.querySelector('meta');
            const title = meta?.querySelector('title')?.textContent || 'Geen titel';
            const link = record.querySelector('preferredUrl')?.textContent || record.querySelector('identifier')?.textContent || '#';
            const abstract = meta?.querySelector('abstract')?.textContent;
            const creator = meta?.querySelector('creator')?.textContent || 'Onbekend';
            const dateText = meta?.querySelector('date')?.textContent;
            const formattedDate = dateText ? new Date(dateText).toLocaleDateString('nl-NL') : 'Onbekend';
            html += createResultItemHTML('wettenbank', title, link, abstract || '', { "Door": creator, "Datum": formattedDate }, globalIndex);
        });
        elements.wettenbankResults.innerHTML = html || "<p>Geen documenten gevonden.</p>";
    };

    const createResultItemHTML = (type, title, link, content, meta, index) => {
        const metaHTML = Object.entries(meta)
            .filter(([, value]) => value && value.trim() && value.trim() !== 'N/A')
            .map(([key, value]) => `<span><strong>${key}:</strong> ${value}</span>`).join('');
        const actionsHTML = `<a href="${link}" target="_blank" rel="noopener noreferrer" class="tertiary-button">Bekijk origineel</a>` +
            (type === 'jurisprudence' ? `<button class="secondary-button search-related-laws-button" data-summary="${encodeURIComponent(content)}">Zoek gerelateerde wetten</button>` : '');
    
        return `<div class="result-item" data-index="${index}">
                    <div>
                        <div class="result-item-header"><h3><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></h3></div>
                        <div class="meta-info">${metaHTML}</div>
                        <div class="summary" id="summary-${index}">${content}</div>
                        ${content.length > 350 ? '<button class="read-more-button" data-action="toggle-summary">Lees meer...</button>' : ''}
                    </div>
                    <div class="result-item-actions">${actionsHTML}</div>
                </div>`;
    };

    const renderWettenbankFacets = (xmlDoc) => {
        const facets = xmlDoc.querySelectorAll('facet');
        if (facets.length === 0) { 
            elements.toggleWettenbankFiltersButton.style.display = 'none';
            return; 
        }
        let html = '<h3>Verfijn op:</h3>';
        const titleMap = { 'w.organisatietype': 'Organisatie Type', 'dt.type': 'Document Type' };
        facets.forEach(facet => {
            const index = facet.querySelector('index')?.textContent;
            const terms = facet.querySelectorAll('term');
            if (terms.length === 0) return;
            html += `<details class="facet-group" open><summary>${titleMap[index] || index}</summary><div class="facet-options">`;
            terms.forEach(term => {
                const actualTerm = term.querySelector('actualTerm')?.textContent;
                const count = term.querySelector('count')?.textContent;
                const query = term.querySelector('query')?.textContent;
                html += `<label class="checkbox-option"><input type="checkbox" data-facet-query='${query}' data-facet-index="${index}"><span class="checkmark"></span>${actualTerm} (${count})</label>`;
            });
            html += `</div></details>`;
        });
        elements.wettenbankFacets.innerHTML = html;
        elements.toggleWettenbankFiltersButton.style.display = 'inline-flex';
    };

    const showKeywordModal = (summary) => {
        const stopWords = new Set(['de', 'het', 'een', 'en', 'van', 'in', 'op', 'met', 'is', 'zijn', 'aan', 'voor', 'door', 'als', 'dat', 'heeft', 'wordt', 'te', 'om', 'uit', 'bij', 'dan', 'naar', 'tot', 'ook', 'niet', 'over', 'onder', 'welke', 'deze', 'dit', 'die', 'er', 'maar', 'zal', 'kan', 'worden', 'artikel', 'bepaalt', 'bepaalde', 'beslissing', 'eiser', 'gedaagde', 'gevolg', 'grond', 'inzake', 'overwegende', 'rechtbank', 'ten', 'uitspraak', 'verweerder', 'volgt', 'zaak']);
        const keywords = summary.toLowerCase().replace(/<[^>]*>/g, "").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/).filter(word => word.length > 3 && !stopWords.has(word));
        const uniqueKeywords = [...new Set(keywords)].slice(0, 15);
        
        elements.keywordOptions.innerHTML = '';
        if (uniqueKeywords.length > 0) {
            uniqueKeywords.forEach(keyword => {
                const button = document.createElement('button');
                button.className = 'keyword-button';
                button.textContent = keyword;
                button.dataset.keyword = keyword;
                button.addEventListener('click', () => button.classList.toggle('selected'));
                elements.keywordOptions.appendChild(button);
            });
            elements.keywordModal.style.display = 'flex';
        } else {
            showNotification('Geen relevante trefwoorden gevonden in de samenvatting.', 'warning');
        }
    };

    const hideKeywordModal = () => { elements.keywordModal.style.display = 'none'; };

    const searchWithSelectedKeywords = () => {
        const selectedKeywords = Array.from(elements.keywordOptions.querySelectorAll('.keyword-button.selected')).map(btn => btn.dataset.keyword);
        if (selectedKeywords.length > 0) {
            const keywordString = selectedKeywords.join(' ');
            elements.wettenbankKeyword.value = keywordString;
            hideKeywordModal();
            handleWettenbankSearch(true);
            elements.wettenbankKeyword.scrollIntoView({ behavior: 'smooth' });
        } else {
            showNotification('Selecteer minimaal één trefwoord.', 'warning');
        }
    };
    
    // --- PAGINERING ---
    const renderPagination = (container, currentPage, totalPages, type) => {
        container.innerHTML = '';
        if (totalPages <= 1) return;
        const totalResults = type === 'jurisprudence' ? jurisprudenceCurrentResults.length : wettenbankTotalResults;
        const resultsPerPage = type === 'jurisprudence' ? jurisprudenceResultsPerPage : wettenbankResultsPerPage;
        let html = `<div class="pagination-controls">
            <button data-type="${type}" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>← Vorige</button>
            <span class="page-indicator">Pagina <input type="number" class="page-input" value="${currentPage}" min="1" max="${totalPages}" data-type="${type}"> van ${totalPages}</span>
            <button data-type="${type}" data-page="${currentPage + 1}" ${currentPage >= totalPages ? 'disabled' : ''}>Volgende →</button>
        </div>`;
        const startResult = (currentPage - 1) * resultsPerPage + 1;
        const endResult = Math.min(currentPage * resultsPerPage, totalResults);
        html += `<div class="results-summary">Resultaten ${startResult}-${endResult} van ${totalResults}</div>`;
        container.innerHTML = html;
    };
    
    const changePage = (type, page) => {
        page = parseInt(page, 10);
        if (isNaN(page)) return;

        if (type === 'jurisprudence') {
            const totalPages = Math.ceil(jurisprudenceCurrentResults.length / jurisprudenceResultsPerPage);
            if (page < 1) page = 1;
            if (page > totalPages) page = totalPages;
            jurisprudenceCurrentPage = page;
            renderJurisprudenceResults();
        } else if (type === 'wettenbank') {
            const totalPages = Math.ceil(wettenbankTotalResults / wettenbankResultsPerPage);
             if (page < 1) page = 1;
            if (page > totalPages) page = totalPages;
            wettenbankCurrentPage = page;
            handleWettenbankSearch(false);
        }
    };

    const handlePaginationClick = (e) => {
        if (e.target.tagName === 'BUTTON') changePage(e.target.dataset.type, e.target.dataset.page);
    };
    const handlePageInputChange = (e) => {
        if (e.target.classList.contains('page-input')) changePage(e.target.dataset.type, e.target.value);
    };

    // --- UTILITIES & STATE MANAGEMENT ---
    const handleResultsClick = (e) => {
        const target = e.target;
        if (target.closest('.search-related-laws-button')) {
            showKeywordModal(decodeURIComponent(target.closest('.search-related-laws-button').dataset.summary));
        } else if (target.dataset.action === 'toggle-summary') {
            const summaryDiv = target.closest('.result-item').querySelector('.summary');
            const isExpanded = summaryDiv.classList.toggle('expanded');
            target.textContent = isExpanded ? 'Lees minder...' : 'Lees meer...';
        }
    };
    
    const showLoading = (show, isNewSearch = false) => {
        elements.loadingIndicator.style.display = show ? 'flex' : 'none'; 
        if (isNewSearch) {
            elements.apiSearchButton.disabled = show;
            elements.apiSearchButton.innerHTML = show ? '<span class="spinner-small"></span> Zoeken...' : '<span class="button-icon"></span> Zoek uitspraken';
        }
    };

    const showStatus = (element, message, type = 'info') => {
        element.textContent = message;
        element.className = `status-message ${type}`;
        element.style.display = 'block';
    };

    const showNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            notification.addEventListener('animationend', () => notification.remove());
        }, 4000);
    };

    const displayActiveFilters = () => {
        let html = '<span>Actieve filters:</span>';
        let hasFilters = false;
        const addTag = (value) => { hasFilters = true; return `<div class="active-filter-tag">${value}</div>`; };
        if (elements.creator.value.trim()) html += addTag(`Instantie: ${elements.creator.value.trim()}`);
        if (elements.subject.value) html += addTag(`Rechtsgebied: ${elements.subject.options[elements.subject.selectedIndex].text}`);
        if (elements.dateFrom.value && elements.dateTo.value) html += addTag(`Periode: ${elements.dateFrom.value} tot ${elements.dateTo.value}`);
        elements.activeFilters.innerHTML = hasFilters ? html : '';
    };

    // --- KEYBOARD SHORTCUTS ---
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { 
            e.preventDefault(); 
            elements.refineFiltersSection.classList.contains('hidden') ? elements.apiSearchButton.focus() : elements.keywordSearchInput.focus(); 
        }
        if (e.key === 'Escape') { 
            if (elements.keywordModal.style.display === 'flex') hideKeywordModal();
        }
    });
    
    // Inject CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        .spinner-small { display: inline-block; width: 16px; height: 16px; border: 2px solid #ffffff; border-radius: 50%; border-top-color: transparent; animation: spin 1s ease-in-out infinite; }
        .primary-button .spinner-small { border-color: #fff; border-top-color: transparent;}
        .background-loader .spinner-small { border-color: var(--medium-gray); border-top-color: var(--primary-blue); }
        @keyframes spin { to { transform: rotate(360deg); } }
        .notification { position: fixed; top: 20px; right: 20px; padding: 12px 20px; border-radius: 6px; color: white; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideInRight 0.3s ease forwards; font-family: var(--font-family); }
        .notification.success { background-color: #28a745; }
        .notification.error { background-color: #dc3545; }
        .notification.warning { background-color: #ffc107; color: #343a40; }
        .notification.info { background-color: #007bff; }
    `;
    document.head.appendChild(style);

    initializeApp();
});
