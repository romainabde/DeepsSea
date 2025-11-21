-- AddForeignKey
ALTER TABLE `ObservationHistory` ADD CONSTRAINT `ObservationHistory_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
