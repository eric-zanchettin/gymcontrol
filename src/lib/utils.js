module.exports = {
        age(timestamp) {
            const today = new Date();
            const birth = new Date(timestamp);
    
            const yearToday = today.getFullYear()
            const yearBirth = birth.getFullYear();
    
            let years = yearToday - yearBirth;
    
            const monthToday = today.getMonth();
            const monthBirth = birth.getMonth();
    
            const dayToday = today.getDate();
            const dayBirth = birth.getDate();
    
            if ((monthToday - monthBirth) < 0 || ((monthToday - monthBirth) == 0 && (dayToday - dayBirth) < 0)) {
                years = years - 1;
            };
    
            return years
        },
        date(timestamp) {
            // Transformando em Objeto de Data
            date = new Date(timestamp);
            
            // Ano
            year = date.getUTCFullYear();

            // Mês
            month = '0'+String(date.getUTCMonth() + 1);

            // Dia
            day = '0'+String(date.getUTCDate());

            // return yyyy-mm-dd
            return {
                iso: `${year}-${month.slice(-2)}-${day.slice(-2)}`,
                birthDay: `${day.slice(-2)}/${month.slice(-2)}`,
                format: `${day.slice(-2)}/${month.slice(-2)}/${year}`,
            }
        },
};