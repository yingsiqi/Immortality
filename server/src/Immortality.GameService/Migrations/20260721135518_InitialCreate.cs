using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Immortality.GameService.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GameEvents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    EventType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    EventData = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameEvents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CharacterName = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    CultivationRealm = table.Column<int>(type: "integer", nullable: false),
                    CultivationLayer = table.Column<int>(type: "integer", nullable: false),
                    CultivationSubLayer = table.Column<int>(type: "integer", nullable: false),
                    SpiritualRoot = table.Column<int>(type: "integer", nullable: false),
                    SpiritualPower = table.Column<long>(type: "bigint", nullable: false),
                    MaxSpiritualPower = table.Column<long>(type: "bigint", nullable: false),
                    Stamina = table.Column<int>(type: "integer", nullable: false),
                    MaxStamina = table.Column<int>(type: "integer", nullable: false),
                    MeritPoints = table.Column<int>(type: "integer", nullable: false),
                    KarmaGood = table.Column<long>(type: "bigint", nullable: false),
                    KarmaEvil = table.Column<long>(type: "bigint", nullable: false),
                    KarmaCausal = table.Column<long>(type: "bigint", nullable: false),
                    KarmaAttachment = table.Column<long>(type: "bigint", nullable: false),
                    KarmaMerit = table.Column<long>(type: "bigint", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    LastActiveAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlayerSnapshots",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlayerId = table.Column<Guid>(type: "uuid", nullable: false),
                    SnapshotVersion = table.Column<int>(type: "integer", nullable: false),
                    SnapshotData = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerSnapshots", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameEvents_PlayerId_CreatedAt",
                table: "GameEvents",
                columns: new[] { "PlayerId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_Players_CharacterName",
                table: "Players",
                column: "CharacterName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Players_UserId",
                table: "Players",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerSnapshots_PlayerId_SnapshotVersion",
                table: "PlayerSnapshots",
                columns: new[] { "PlayerId", "SnapshotVersion" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameEvents");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "PlayerSnapshots");
        }
    }
}
