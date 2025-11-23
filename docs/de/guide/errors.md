---
outline: deep
---

# Häufige Fehler

Dieser Guide listet häufige Fehler auf, die bei der Verwendung von ContentKit auftreten können, und wie man sie behebt.

## Konfigurationsfehler

### Warnung vor veralteter Konfiguration

Wenn du eine Warnung über die Verwendung einer veralteten Konfiguration siehst, schaue bitte in den [Migration Guide](../migration-guides/1.0.md).

## Build Fehler

### Ungültiger Feldtyp

Wenn du einen "Invalid type for field" Fehler erhältst, bedeutet das, dass die Daten in deinem Markdown Frontmatter nicht mit dem in deiner Konfiguration definierten Schema übereinstimmen. Überprüfe die in der Fehlermeldung genannte Datei und stelle sicher, dass der Feldtyp korrekt ist.

### Doppelte Dokument-IDs

ContentKit benötigt eindeutige IDs für Dokumente. Wenn du mehrere Dateien mit demselben Pfad hast (was in einem Standard-Dateisystem nicht passieren sollte) oder wenn du IDs manuell auf eine Weise überschreibst, die zu Kollisionen führt, erhältst du einen Fehler.
